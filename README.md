# Covid-19 and Public Health Units in Ontario

## Overview
This project is to showcase the strategic thinking and group efforts to predict and analyze the Covid-19 data for a vaccine roll-out program.  The analysis will recognize the trends; the highs and lows of Covid 19 cases at each of the 34 Public Health Units in Ontario, Canada. The reason for this topic is because Covid-19 has has a huge impact on everyone and also it is the most relevant and relatable topic to discuss currently.


## Research goal
The goal of this analysis is to determine the eligibiltiy to plan and execute a successful vaccine roll-out program. The process stated here is to assist the Ministry of Health to identify, prioritize and execute vaccinations based on age group and or gender for future epidemics and pandemics.  <br>
Data of current confirmed Covid-19 cases have been collected and used to create a machine learning model that can provide predictions and help understand the probability of higher cases within a specific attribute of demographics.  <br>
The same data has been used for exploratory analysis to isolate results of each age group and gender for each Public Health Units.  <br>
Below are the steps taken to provide results for this analysis.

#### Data Source 
- [Ontario Data Catalogue](https://data.ontario.ca/dataset/confirmed-positive-cases-of-covid-19-in-ontario/resource/455fd63b-603d-4608-8216-7d8647f43350)
<br>

## Extract, Transform & Load
The original data downloaded had 522,465 records which is a much larger file to work with and push in github.  Therefore the dataset has been scaled down using a random sample method and creating a *sample_covid_dataset.csv*, resulting in 13,524 records.<br>
This sampled dataset has been used for the database, machine learning model, exploratory analysis, Tableau and the interactive dashboard.<br>
*The sampled data has been filtered, cleaned and segregated to create new smaller datasets for each part of the project.*<br>

## Database 
After the cleaning and preprocessing of the dataset, the *PHU_dataset_cleaned.csv* was split into four different tables.  Below is the ERD as a blueprint for the database, establishing the relationships created for each table.

### ERD:

<p align='center'> 
  <img width='500' height='247' src="https://user-images.githubusercontent.com/75905911/119560169-95f8d980-bd71-11eb-9856-01d72383ade1.png">
</p>
<p align='center'>
  <img width='500' height='247' src="https://user-images.githubusercontent.com/75905911/119560180-98f3ca00-bd71-11eb-9926-755b8e07d208.png">
</p>
<br>

### Database Storage:

A database instance was created on AWS' RDS (relational database) and four buckets, one for each table, were created using S3 - a public cloud storage on AWS.

<p>
  <img width='500' height='247' src="https://user-images.githubusercontent.com/75905911/119559642-f2a7c480-bd70-11eb-81bd-8575e47d3c99.png">
  <img width='500' height='247' src="https://user-images.githubusercontent.com/75905911/119559660-f9ced280-bd70-11eb-9c77-85b4c9e519b5.png">
</p>


### Connection String:

To create a connection from the database into PostgreSql, the SQLAlchemy's create engine library was used to load the refined csv file.

<img src="https://github.com/UofT-Government-Project/Covid19_PHU/blob/main/Images/Connection%20String.png?raw=true">

### PostgreSQL Database:

Once the data was saved on the cloud storage, it was imported into a SQL database, Postgres using pgAdmin.  Using queries, a table named "phu" was created to host the entire dataset.  Further querying the main table, additional tables were created and then saved as csv files in the Datasource file.  The new files were used by group members for different aspects of the project.<br>
<br>
*schema1.sql* file shows the queries.

Using the newly saved csv files, four more tables were created and their corresponding data imported with queries.<br>
<br>
*schema2.sql* file shows the additional queries.
<br>

#### Tables from schema2.sql:
1.  PHU_locations - details containing the name and ID associated for a specific PHU (Public Health Unit) along with the coordinates and physical address for all of 34 units.
<p align='center'>
  <img width='700' height='291' src='https://github.com/UofT-Government-Project/Covid19_PHU/blob/main/Images/PHU_locations.png?raw=true'>
</p>

2.  PHU - details include the age groups, gender, outcome for each case and the week, month and year for each case associated with each PHU.  An index ID was included to create a primary key to call on during queries.

<p align='center'>
  <img width='700' height='242' src="https://github.com/UofT-Government-Project/Covid19_PHU/blob/main/Images/phu.png?raw=true">
</p>

3.  PHU_Gender_final - includes the gender and the count associated with each PHU ID.

<p align='center'>
    <img width='400' height='310' src="https://user-images.githubusercontent.com/33900637/165677818-d0327a0b-e037-4231-b5b8-c59d8dc3e1a3.png">
</p>

4.  PHU_Age_Group_Final - contains the age group per case associated with each PHU ID.

<p align='center'>
  <img width='400' height='310' src="https://user-images.githubusercontent.com/33900637/165677667-df43a048-a335-4a45-bbc7-5d432d3787e9.png">
</p>                               
                               
                                
### Joins:

Two more tables were created by joining tables using the inner join method:
  1.  phu_by_age_and_outcome <br>
<p align='center'>
  <img width='650' height='286' src="https://user-images.githubusercontent.com/75905911/119880776-9670ac00-befa-11eb-8920-9e36496aca8b.png">
</p>

<p align='center'>
  <img src="https://user-images.githubusercontent.com/75905911/119879902-b6ec3680-bef9-11eb-8f79-191951a1fe4e.png">
</p>

  2.  phu_by_gender_and_outcome <br>

<p align='center'>  
  <img width='650' height='290' src="https://user-images.githubusercontent.com/75905911/119880078-e13df400-bef9-11eb-8de1-acae1db62c3e.png">
</p>


<p align='center'>
  <img src="https://user-images.githubusercontent.com/75905911/119879939-c10e3500-bef9-11eb-8175-eafed7f30472.png">
</p>
<br>
<br>

## Prediction with Machine Learning

### The Machine learning model: 

With the sample dataset, the machine learning model created is to predict a patient's probability of recovery from the Covid-19 virus based on the age group and gender.  <br>
Ideally a dataset with patients' health history, ie; existing health conditions, would allow the model to predict to it's fullest extent.  After alot of research for the ideal dataset, it was difficult to find one that includes other factors of a patient's health, to provide continuous features which would provide a better prediction.  This information may not be available to the general public assuming it would be a privacy issue.<br>  However based on the current dataset being the most relatable to the analysis and model, the current data is limited to age group and gender.  Therefore the RandomForest classifier (RFC) from ML sklearn library has been selected for the machine learning model.  

### Cleaning and Preprocessing:

Similar to the ETL process, the dataset was required to be cleaned and preprocessed to avoid errors in the prediction.  The following steps were:
  - dropped unnecessary columns that have no impact on the predictation
  - renamed the column names
  - converted 'Case Date' column to ordinal Day by using toordinal function
  - checked the categorial features and generated variable list
  - checked the unique value counts for PHU_ID to see if binning is required
  - plotted the density of value count of PHU_ID to determine what values to replace.

 <p align='center'>
  <img src='https://user-images.githubusercontent.com/33900637/165677336-c82b0688-0b99-45c2-bef2-007999b02c20.png)
 '>
 </p>
 
  - binned all PHU_IDs with less than 400 to keep the number of features at 10
  - converted the categorial features to continues by using OneHotEncoder from sklearn library
  - merged the dataframes and dropped the categorial column

### Set the Target and features:

In order to focus the model's prediction to an outcome of "Recovered" or "Fatal, any rows with patients categorized as "Not Recovered" were removed.  These records would mean the case is still active and therefore not valid for a prediction. <br>
For the model, "Resolved" cases in the outcome column has been set as the target variable *(y)* and the remainder features set as *(X)* minus the outcome columns cases.

### Training and testing set:  

Following the named target and features, the data was then split to training and testing sets by using the train_test_split function from the sklearn library.  <br>
Furthermore both training and testing data sets were then scaled to normalize the data.

### RandomForest Classifier ML model:

***The pros and cons of RFC***<br>
The RFC model was chosen for multiple positive reasons:
  - because it reduces the chances of overfitting by using decision trees which improves high accuracy
  - the model is robust to outliers
  - it works well with both categorical and continous values
  - the correlation between features are minimal and therefore reduces the number of multiple learning algorithms
  - it automates missing values in the data
 <br>
 Though the RFC model has many positive attributes, there are some limitations in the performance. <br>
Training large number of deep trees can be expensive in terms of computing and memory usage required.  If the data was much more diverse, the model may not be able to interpret any comparision between individual decision trees.  The RFC model also cannot perform extensively with imbalanced data.

### Model Results:

After running the model, the accuracy score is 0.908.  The high accuracy score is due to the higher rate of recovered cases.  <br>
Based on the Confusion Matrix below there are 3,152 Covid-19 cases used in the model.  The results identified:
  - out of 194 total fatal cases - 29% of the cases were predicted true and 71% were predicted falsely
  - out of 2,958 total resolved cases - 51% of the cases were predicted false and 49% were predicted correct.

<p align='center'>
  <img src="Images/Confusion_matrix.png">
</p>
<br>
<br>

## Alternative Machine Learning Model

An alternative model was created using another dataset, *cases_by_status_and phu.csv*.  This dataset was an exploratory model to predict exponential quantities and measure the accuracy of the model.  A Linear Regression was chosen due to the nature of the data. <br>
<br>
This dataset has 5 features; Date of when the cases was reported, PHU ID, Active cases, Resolved cases and Fatalities.  Data was cleaned using same steps as previous model.  Since the data is an accummulating data, it was normalized by calculating the square root, taking the results and squaring the numbers.  The data can also be normalized by using logarithm and reversing it by power operator.<br>
We used the "Deaths" as the target *(y)* and the date as the feature *(X)*.  The active and resolved cases were removed as they would impact the results negatively and cause overfitting.  Again the data was split into training and testing sets. <br>
<br>
Since the data is based on each of the 34 Public Health Units, the model would need to run individually for each location.  Therefore for this purpose, the model was focused on the Toronto Public Health Unit.<br>
<br>
After running the model the R_squared score was strong at 0.96. <br>
<br>
<p align='center'>
  <img src='https://user-images.githubusercontent.com/33900637/165677188-3ea0d490-5fe5-476e-adc0-a115730df2a7.png'>
</p>

This model can predict the number of deaths in the near future if no external factor impacts the data.   It can be used to forecast the implications when the Ministry of Health need to weigh in the reasons of lockdown and or restrictions.  It can also assist the original goal of this analysis - a plan to execute a vaccination roll-out program that prioritizes based on deaths at each PHU. 
<br>
<br>

## Exploratory Analysis

In exploring the data with further analysis on Python, the results can identify and isolate specific information overall in Ontario.  Such as:
  - Identifying the number of cases per age group.  Based on the pie chart below, the highest number of cases are within the 20 years of age at 14.7% and the lowest at 5.9% within the age of 70.<br>
<br>

<p align='center'>
  <img width='500' height='300' src='https://user-images.githubusercontent.com/33900637/165677155-2e3edbc2-a2d2-485c-b503-643e47a93cf3.png'>
</p>

  - Number of cases per gender.  This chart reveals females have been more of the victim for contracting Covid-19, at 54.1% vs. males at 45.1%. <br>
  
<p align='center'>
  <img width='500' height='300' src='https://user-images.githubusercontent.com/33900637/165677105-bf5ae333-e347-4f14-a77e-0bcbd8d89227.png'
</p>

  - Cases by age and gender.  Below chart segregates the cases by gender and age.  Highest cases are females within the age of 40 and lowest are male in the ages of 90 +. <br>
  
<p align="center">
  <img src="https://user-images.githubusercontent.com/75437852/120935338-4c44b300-c6d0-11eb-9649-2507eef5b96a.png">
</p>

  - Percentage of fatalities per gender reveals a higher rate for females at 6.41%, this would be obvious due to higher number of cases in females. 
  
<p align="center">
  <img src="https://user-images.githubusercontent.com/33900637/165676821-004c7717-15c5-4126-a0f8-dba909a23bed.png">
</p>

 
 ## Storyboard
 
 Tableau has been used to create the final synopsis of the project's finding and display as a storyboard. <br>
 Below are the visualizations and link.
 
  1.  **Overview of Covid Cases**

The image below shows the total number of cases, number of cases based on age group, gender and status.
<p align='center'>
  <img width='800' height='600' src='https://user-images.githubusercontent.com/76136277/120877196-265dc800-c583-11eb-9925-1779e0df8bd2.png'>
</p>
<br>
  2.  **Cases by Age Group and Public Health Unit**
  
This image shows the number of cases by Public Health Unit ID vs Age group. 
<p align='center'>
  <img width='800' height='600' src='https://user-images.githubusercontent.com/76136277/120877269-9c622f00-c583-11eb-98bd-ede0352f18e3.png'>
</p>
<br>
  3.  **Cases by Public Health Unit**

The image was created using tableau map. It shows the number of cases by public health unit. The size of each bubble represents the number of cases. The bar graph below also shows gender by age PHU.
<p align='center'>
  <img width='800' height='600' src='https://user-images.githubusercontent.com/76136277/120877233-6a50cd00-c583-11eb-8d64-1f9dd6161459.png'>
</p>
<br>
  4.  **Overview of Cases by Status**

The image below represents covid status; number of fatal, resolved and not resolved cases by age group, gender and PHU.
<p align='center'> 
  <img width='800' height='600' src='https://user-images.githubusercontent.com/76136277/120877171-f8788380-c582-11eb-8183-29a493b04c37.png'>
</p>
<br>
  5.  **Covid Cases by Year/Month**

In this image, we can see cases by age group and gender on a monthly timeline starting from January to Decemeber. The darker the shade of colour represents the higher number of cases. Also, the line graph shows yearly cases by gender. We can conclude that there were more cases in year 2020 than in year 2021. Lastly, females have the highest number of covid cases.
<p align='center'>' 
  <img width='800' height='600' src='https://user-images.githubusercontent.com/76136277/120877460-a6386200-c584-11eb-9903-d05a3dce2195.png'>
</p>
<br>

***A full storyboard can be viewed on Tableau Public [here](https://public.tableau.com/app/profile/tina.dinh/viz/OntarioCovidCases_16511168875170/OntarioPublicHealthUnitCovidStatistics).***
<br>
<br>

## Dashboard 

The final aspect of this analysis was an interactive dashboard that has been created providing statistics of age group and gender for each Public Health Unit in Ontario.  Users can select a specific Public Health Unit in Ontario to view it's location, number of cases by age, number of cases by gender and percentage of outcome. <br>
<br>
The sample data was extracted using pandas in Python to clean data using similar process as the ETL.  Then the data was grouped by each PHU to tabulate totals.  Thereafter the final dataframe was transformed into a preferred JSON format.  *Step by step process can be seen in processing_csv_to_json.ipynb.*  <br>
<br>
Once data was saved as required, the file was called into a JavaScript file using D3 library.  With each iteration, 3 charts were created using plotly.  Finally, the data was displayed in a HTML file calling bootstrap 3 to format the positioning of each chart. <br>
<br>

<p align='center'>
  <img width='294' height='607' src='https://user-images.githubusercontent.com/75437852/121713171-8df7a400-caaa-11eb-879f-884c883ce677.PNG'>
</p>

***The interactive dashboard has been deployed using github pages and can be viewed in full [here](https://uoft-government-project.github.io/Covid19_PHU/).***


## Summary

Based on this analysis, each Public Health Unit in Ontario have different age groups and or gender with higher cases. <br>
<br>
With this unforeseen pandemic, the Government rolled out the vaccination program as soon as possible, starting from the elderly age group down to the younger population to control the Covid-19 virus from spreading further.  Though this plan has been successful thus far, the rise of cases  took longer to curtail. <br>
<br>
Should there be another pandemic/epidemic in the future, we hope this analysis can shed light  and can be imitated on how to target a specific demographic of the population for each region in Ontario.  <br>
Understanding there may be other logistics involved to distribute the vaccine based on the results here, a similar analysis can possibly highlight the need to vaccinate a specific part of the population first.  Which not only could avoid further spread but also diminish the cases sooner.
