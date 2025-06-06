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
  
  
  export function getMonthWiseQSetCreateCount(quizData) {
    console.log("quizData", quizData)
    const monthCounts = Array.from({ length: 12 }, (_, index) => ({
      month: new Date(0, index).toLocaleString('default', { month: 'long' }),
      QuestionSet_created: 0,
    }));
  
 
    quizData?.forEach((quiz) => {
      if (quiz.modified_date) {
        const quizDate = new Date(quiz.modified_date);
        const monthIndex = quizDate.getMonth(); 
        monthCounts[monthIndex].QuestionSet_created += 1;
      }
    });
   console.log("monthCounts", monthCounts)
    return monthCounts;
  }
  
  export function getMonthWiseAttemptCount(quizData) {
   
    const monthCounts = Array.from({ length: 12 }, (_, index) => ({
      month: new Date(0, index).toLocaleString('default', { month: 'long' }),
      Quiz_Attempt: 0,
    }));
  
 
    quizData?.forEach((quiz) => {
      if (quiz.modified_date) {
        const quizDate = new Date(quiz.modified_date);
        const monthIndex = quizDate.getMonth(); 
        monthCounts[monthIndex].Quiz_Attempt += 1;
      }
    });
  
    return monthCounts;
  }