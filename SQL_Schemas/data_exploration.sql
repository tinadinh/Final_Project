--Create phu_by_age_count
select phu_id, age_group, SUM(age_group_count) 
FROM phu_age_group_final
GROUP BY phu_id, age_group
ORDER BY phu_id, age_group ASC;

--Create phu_by_age_count_avg 
select phu_id, age_group, AVG(age_group_count) 
FROM phu_age_group_final
GROUP BY phu_id, age_group
ORDER BY phu_id, age_group ASC;

--Create phu_by_gender_count 
select phu_id, gender, SUM(gender_count) 
FROM phu_gender_final
GROUP BY phu_id, gender
ORDER BY phu_id, gender;

--Create phu_outcome table
SELECT phu_id, outcome, COUNT(outcome)
FROM phu
GROUP BY phu_id, outcome
ORDER BY phu_id, outcome

--Create phu_outcome_by_gender 
SELECT phu_id, outcome, COUNT(outcome), gender
FROM phu
GROUP BY phu_id, outcome, gender
ORDER BY phu_id, outcome, gender

-- Create phu_outcome_by_age_group
SELECT phu_id, outcome, COUNT(outcome), age_group
FROM phu
GROUP BY phu_id, outcome, age_group
ORDER BY phu_id, outcome, age_group

