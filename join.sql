SELECT firstName, lastName, jobName, wages
FROM employees
  INNER JOIN jobs ON employees.jobsId = jobs.id;