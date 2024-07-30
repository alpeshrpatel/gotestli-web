SELECT qsq.question_id, qm.question
from testli.question_set_questions qsq, question_set qs 
, question_master qm 
where qs.id = 1 and qsq.question_set_id = qs.id  and qm.id = qsq.question_id