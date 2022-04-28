
--Create PHU_locations-------------------------------------
CREATE TABLE PHU_locations (
	id INT,
	PHU_id INT,
	Reporting_PHU VARCHAR,
	Reporting_PHU_Address VARCHAR,
	Reporting_PHU_Latitude FLOAT,
	Reporting_PHU_Longitude FLOAT,
	PRIMARY KEY(PHU_id)
);

--Create PHU table
CREATE TABLE PHU (
	id INT,
	age_group VARCHAR,
	gender VARCHAR,
	outcome VARCHAR,
	outbreak VARCHAR,
	phu_id INT,
	week INT,
	month INT,
	year INT,
	PRIMARY KEY (id),
	FOREIGN KEY (phu_id) REFERENCES PHU_locations (PHU_id)
);

--Create PHU_Gender_Final table
CREATE TABLE PHU_Gender_Final (
	index INT,
	phu_id INT,
	gender VARCHAR,
	gender_count INT,
	FOREIGN KEY (phu_id) REFERENCES PHU_locations (PHU_id)
);

--Create PHU_Age_Group_Final table
CREATE TABLE PHU_Age_Group_Final (
	index INT,
	phu_id INT,
	age_group VARCHAR,
	age_group_count INT,
	FOREIGN KEY (phu_id) REFERENCES PHU_locations (PHU_id)
);

