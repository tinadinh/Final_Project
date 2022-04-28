CREATE TABLE phu(
	_id VARCHAR,
	Age_Group VARCHAR,
	Gender varchar,
	Outcome varchar,
	outbreak varchar,
	PHU_id varchar(4),
	Week int,
	Month int,
	Year int,
	PRIMARY KEY(_id)
	FOREIGN KEY(PHU_id)
);

--Creating a table for PHU by age group count--------------

SELECT phu_id, age_group, COUNT(age_group) INTO phu_by_age
FROM (SELECT phu_id, age_group FROM phu) AS table2
GROUP BY table2.phu_id,table2.age_group
ORDER BY phu_id,age_group;

--Create PHU table by gender--------------------------------

SELECT phu_id, gender , COUNT(gender) INTO phu_by_gender
FROM (SELECT phu_id,gender FROM phu) AS table1
GROUP BY table1.phu_id,table1.gender
ORDER BY phu_id;
------------------------------------------------------------
