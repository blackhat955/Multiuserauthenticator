# REST API and NPM Library that provides security for user authentication and authorization when a user tries to log in or SignUp

### About:
- This API is intended to provide solutions for user authentication and authorization. The developer has been spending hours designing and developing secure channels for the transaction, but this package enables them to reduce their effort by 40 to 50% and make the overall process more efficient than ever before. They will be able to use this package directly in their program as well as they are also able to do changes according to their need.

##### Hosted API Link: [ ! Here you go](https://authentiction-service.onrender.com/)

##### NPM Library :[ ! Here you go](https://www.npmjs.com/package/multiuserauthenticator)

<br><br>

### Demo:

### LOGIN AS ADMIN
![s1](https://github.com/blackhat955/internship_task_project_new/blob/main/intership_assingment_image_of_testing_api/login%20as%20admin.png) <br><br>
## TRY TO LOGIN USER WITHOUT ADMIN PRIVILEGES
![s2](https://github.com/blackhat955/internship_task_project_new/blob/main/intership_assingment_image_of_testing_api/try%20to%20login%20as%20admin%20without%20token.png)  <br><br>
## TRY TO REMOVE  SOMEONE WITHOUT ADMIN PRIVILEGES 
![s3](https://github.com/blackhat955/internship_task_project_new/blob/main/intership_assingment_image_of_testing_api/try%20to%20delete%20some%20without%20a%20valid%20token.png)  <br><br>
## DATABSE ENTRY 
![s4](https://github.com/blackhat955/internship_task_project_new/blob/main/intership_assingment_image_of_testing_api/entry%20of%20new%20user.png)  <br><br>
## ENTER A WORNG EMAIL OR PASSWORD
![s5](https://github.com/blackhat955/internship_task_project_new/blob/main/intership_assingment_image_of_testing_api/try%20to%20update%20password%20for%20worng%20email.png)  <br><br>
## PROMOTE NORMAL USER TO ADMIN 
![s6](https://github.com/blackhat955/internship_task_project_new/blob/main/intership_assingment_image_of_testing_api/udate%20the%20user%20as%20admin%20postman%20put%20call.png)  <br><br>
## REGISTER AS ADMIN USING ADMIN PASSWORD WHICH IS GIVEN TO THEM BY ORGANIZATION
![s7](https://github.com/blackhat955/internship_task_project_new/blob/main/intership_assingment_image_of_testing_api/register%20as%20admin%20with%20admin%20password.png)  <br><br>
## TRY TO DELETE USER WITHOUT PRIVILEGES
![s8](https://github.com/blackhat955/internship_task_project_new/blob/main/intership_assingment_image_of_testing_api/try%20to%20delete%20some%20without%20a%20valid%20token.png)  <br><br>
```javascript
app.get('/',async(req,res)=>{
    res.send([{Info:"welcome to api Information page", },
     { "/api/register":"register User and admin with different privilage admin need to admin password for register"},
{"/api/login":"admin log using only through token and normal user need to send req.body having userId and password"},
{"/api/register":"register User and admin with different privilage admin need to admin password for register"},
{"modification":"update and delete the user done by admin only route are protected"},
{"/api/login/admin":"for admin"},
{"/api/login/normal":"normal user"},
{"/api/register/admin":"nee password for register as admin"},
{"/api/register/normal":"register as normal user"},
{"put request at .api/register/":"requset to pass req.body.isAdmin"},
{"delete /api/register/id":"pass id as parameter"},
{"the screenshot of testing of api are attach my github respository":"pls have a look"}])
});
```
- For Makeing it  More secure and reliable I am still working on it  .<br><br>
## Contributer's is Always welcome 
- if anyone want to collaborate feel free to contact me or message me on linkedin    :)  <br>
## Regards & Welcome <br>

[Durgesh Tiwari](https://www.linkedin.com/in/durgesh98/)
