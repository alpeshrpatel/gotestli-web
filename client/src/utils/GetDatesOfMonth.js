export function getMonthWiseQuizCount(quizData) {
   
    const monthCounts = Array.from({ length: 12 }, (_, index) => ({
      month: new Date(0, index).toLocaleString('default', { month: 'long' }),
      Completed_Quiz: 0,
    }));
  
 
    quizData.forEach((quiz) => {
      if (quiz.modified_date && quiz.status == 1) {
        const quizDate = new Date(quiz.modified_date);
        const monthIndex = quizDate.getMonth(); 
        monthCounts[monthIndex].Completed_Quiz += 1;
      }
    });
  
    return monthCounts;
  }
  
  
  
  