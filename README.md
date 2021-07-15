# Synopsis
This repo calculates BMI of people, provided as JSON input. It also calculates other metrics like BMI Category and BMI Health Risk. Below is the criteria for determining category and health risk:

| BMI Range | BMI Category | BMI Health Risk |
| :---         |     :---:      |          ---: |
| 18.4 and below   | Underweight     | Malnutrition risk    |
| 18.5 - 24.9     | Normal weight       | Low risk      |
| 25 - 29.9   | Overweight     | Enhanced risk    |
| 30 - 34.9   | Moderately obese     | Medium risk    |
| 35 - 39.9   | Severely obese     | High risk    |
| 40 and above   | Very severely obese     | Very high risk    |

Here, big json is used to handle landle large input and output data.

# Install

1. Install npm packages:
```js
npm install
```

2. Add your json entries into **data.json** file

3. Run application
```js
node index.js
```

4. Output will be returned in **output-data.json** file

5. Run tests
```js
npm test
```

# Jenkins Pipeline
Jenkins should have docker installed. If using docker image then refer below:
https://www.jenkins.io/doc/book/installing/docker/

Follow below steps to run the pipeline on Jenkins:


1. Install NodeJS plugin. Configure it:
   
   a. Go to Manage Jenkins --> Global Tool Configuration --> NodeJS.
   
    b. Specify name as NodeJs.
   
    c. Click on *Save*.

2. Add docker registry credentials in Jenkins with ID **dockerhub**

3. Change the environment variable: registry value as per your dockerhub username and repository name.
   
4. Create a pipeline

5. Go to *Pipeline* section and choose *Pipeline script from SCM*.

6. Click on *Save* and run the job.

