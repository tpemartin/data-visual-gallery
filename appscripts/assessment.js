function updateMutualAssessmentGrades(sheetname='111-1-week11'){
  const spLock = SpreadsheetApp.openById("1yu6fB5YKjG98Wvo4r4q_1y1zxAsduEfQoo4C78u0bQk")
  const sheetLock = spLock.getSheetByName(sheetname+"-lock")
  const {valuesLock, keysLock} = readLockSheet(sheetname)
  Logger.log(valuesLock.map((e,i)=>i))
  if(!Object.keys(keysLock).includes("grade")){
    const gradeColumnLetter = String.fromCharCode(65+Object.keys(keysLock).length)
    sheetLock.getRange(gradeColumnLetter+"1").setValue("grade")
    const allGrades = computeAssessment(sheetname)
    valuesLock.map((e,i)=>{
      let graphNumberString = e[keysLock["graphNumber"]]+''
      sheetLock.getRange(`${gradeColumnLetter}${i+2}`).setValue(
        allGrades[graphNumberString]
      )
    })
    Logger.log(allGrades)
  }
  Logger.log(String.fromCharCode(65+Object.keys(keysLock).length))
}

function computeAssessment(sheetname="111-1-week11"){
  const {valuesLock, keysLock} = readLockSheet(sheetname)
  const {valuesAss, keysAss} = readAssessmentSheet(sheetname)
  Logger.log(keysAss)
  Logger.log(valuesAss[0][keysAss["1"]])
  var graphNumbers = valuesLock.map(e=>e[keysLock["graphNumber"]]+'')
  // var computeAvgGradeOfAssesser_i
  const computeAvgGradeOfAssesser_i = generateComputeAvgGradeOfAssesser_i(valuesAss, keysAss, valuesLock, keysLock)
  // assesser's own graph grades
  const assesserGrades = valuesAss.reduce(computeAvgGradeOfAssesser_i, {})
  const listGraphsThatHaveAssessed = Object.keys(assesserGrades)
  const listGraphsThatDidNotAssess = graphNumbers.filter(e=>!listGraphsThatHaveAssessed.includes(e))
  Logger.log(listGraphsThatDidNotAssess.length===0?1:0) // 1 means somebody did not do mutual assessment
  var allGrades = {...assesserGrades}
  if(listGraphsThatDidNotAssess.length===0){
    listGraphsThatDidNotAssess.forEach(graphNumber => {
      let graphNumberString=graphNumbers+''
      allGrades[graphNumberString]=computeAverageGradeWithoutExclusionOfGraph(graphNumberString, valuesAss, keysAss)
    })
  }
  Logger.log(allGrades)
  return allGrades
}
function computeAverageGradeWithoutExclusionOfGraph(graphNumberString,valueAss,keysAss){
  return valueAss.reduce((a,b)=>a+b[keysAss[graphNumberString]],0)/valueAss.length
}
function generateComputeAvgGradeOfAssesser_i(valuesAss, keysAss, valuesLock, keysLock){
  // To log those already assessed, later for those not assessed we simply do the average
  return function(accum, valueAss_i,i){
    // remove valueAss_i,
    var valuesAssTemp = [...valuesAss]
    //For each valuesAss, get school Id
    const assesserId=valueAss_i[keysAss["學號"]]+''
    // find assesserGraphNumber
    const assesserLock = valuesLock.filter(e=> e[keysLock["schoolId"]]+''===assesserId)[0]
    const assesserGraphNumber = assesserLock[keysLock["graphNumber"]]+''
    // log it's already computed.
    //graphNumbersAlreadyComputed.push(assesserGraphNumber)
    
    valuesAssTemp.splice(i,1)
    // compute mean grade from ass sheet of assesserGraphNumber
    var assessOnAssesserGraph = valuesAssTemp.map(e=> e[keysAss[assesserGraphNumber+'']])
    var avgOnAssesserGraph = assessOnAssesserGraph.reduce((a, b) => a + b, 0) / assessOnAssesserGraph.length;
    accum[assesserGraphNumber] = avgOnAssesserGraph
    return accum
  }
}
function createGraphNumber(sheetname="111-1-week11") {
  //read lock sheet
  const spLock = SpreadsheetApp.openById("1yu6fB5YKjG98Wvo4r4q_1y1zxAsduEfQoo4C78u0bQk")
  const sheetLock = spLock.getSheetByName(sheetname+"-lock")
  var rangeLock = sheetLock.getDataRange()
  var  valuesLock = rangeLock.getValues()
  const graphNumberColumnIndex = rangeLock.getNumColumns()
  const totalGraphs = rangeLock.getNumRows()-1
  
  const maxColumnLetter = String.fromCharCode(65+graphNumberColumnIndex)
  const graphNumberColumnValues = ["graphNumber", ...Array(totalGraphs).fill().map((e,i)=>i+1)]
    .map(e=> [e])
  var value0Lock = valuesLock.splice(0,1)
  const graphRange = sheetLock.getRange(`${maxColumnLetter}1:${maxColumnLetter}${totalGraphs+1}`)
  graphRange.setValues(graphNumberColumnValues)
      // .setValues(Array(totalGraphs).fill().map((e,i)=>i+1))
}
function readLockSheet(sheetname="111-1-week11") {
  //read lock sheet
  const spLock = SpreadsheetApp.openById("1yu6fB5YKjG98Wvo4r4q_1y1zxAsduEfQoo4C78u0bQk")
  const sheetLock = spLock.getSheetByName(sheetname+"-lock")
  var rangeLock = sheetLock.getDataRange()
  var  valuesLock = rangeLock.getValues()
  // Logger.log(valuesLock)
  var value0 = valuesLock.splice(0,1)[0]
  var keys={}
  value0.forEach((e,i)=>{
    keys[e]=i
  })
  //Logger.log(valuesLock)
  return {valuesLock: valuesLock, keysLock: keys}
}
function readAssessmentSheet(sheetname="111-1-week11"){
  //read form
  const spForm = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1CfaP3Sk2i4mx3ray0bI7aZMZWWeQi35PTwEJmSlQV5g/edit?resourcekey#gid=1913377524")
  const sheetForm = spForm.getSheetByName(sheetname)
  var values = sheetForm.getDataRange().getValues()
  //Logger.log(values[0])
  // get keynames
  var value0 = values.splice(0,1)[0]
  //Logger.log(value0)
  var keys={}
  value0.forEach((e,i)=>{
    const value=e
    if(/\[[^\[\]]+\]/.test(value)){
      keys[value.match(/\[[^\[\]]+\]/)[0].match(/[0-9]+/)[0]]=i
    } else {
      keys[value]=i
    }
  })
  //Logger.log(keys["學號"])
  // get each schoolId's graphnumber
  //Logger.log(values[0][keys["學號"]])
  return {valuesAss: values, keysAss: keys}
}
