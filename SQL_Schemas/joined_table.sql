
---Joining all four tables
SELECT phu_locations.id, 
	phu_locations.phu_id, 
	phu_locations.Reporting_PHU,
	phu_locations.reporting_phu_address, 
	phu_locations.reporting_phu_latitude, 
	phu_locations.reporting_phu_longitude, 
	phu.outcome, 	
	phu.outbreak, 
	phu.week, 
	phu.month, 
	phu.year, 
	phu_age_group_final.age_group, 
	phu_age_group_final.age_group_count, 
	phu_gender_final.gender, 
	phu_gender_final.gender_count 
INTO phu_joined
FROM phu_locations
INNER JOIN phu ON phu_locations.id = phu.id
INNER JOIN phu_age_group_final ON phu_locations.phu_id = phu_age_group_final.phu_id
INNER JOIN phu_gender_final ON phu_locations.phu_id = phu_gender_final.phu_id