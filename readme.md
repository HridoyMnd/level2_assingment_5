
## Digital Wallet System

#### Digital wallet system is a mobile banking website. This project built with NodeJs, Express, Typescript and Mongoose. Its allow users to Send money to other users, Top-up his own Wallet, Withdrow from his Wallet. The main goal of this project is to helps users who have hand to hand money transfer issue to their friends or relative.

### Techstack used in the project 
   * NodeJs
   * Express
   * Typescript
   * Mongoose


### Features and packages
   * Zod validation for user data validation
   * google auth for authincation
   * jwt for user login access
   * passport js for user authincate validate
   * bcryptjs for password hashing
   * http status code for custom error code

### Setup  and environments
  * clone  the project (https://github.com/HridoyMnd/level2_assingment_5.git)
  * install required evn variables 


### All implimented Endpoints summary
 #### User api endpoint
 * (api/v1/user/register) For create a unique user 
 * (api/v1/user/all_users) Only Admin can visit all users 
 * (api/v1/user/me) Only user can visit his own data 
 * (api/v1/user/update/:id) Admin and userowner can update userInfo 
 * (api/v1/user/delete/:id) Admin and userowner can delete userInfo 

#### Wallet api endpoint
 * (api/v1/wallet/all_wallet) Only admin can visit 
 * (api/v1/wallet/my_wallet) Only wallet owner can visit 
 * (api/v1/wallet/update/:id) Only wallet owner and Admin can update wallet 
 * (api/v1/wallet/delete/:id) Only Admin can delete wallet 

#### Transaction api endpoint
 * (api/v1/transaction/create_transaction) Autometically create after money transfer
 * (api/v1/transaction/all_transaction) Only Admin can visit this route
 * (api/v1/transaction/my_transaction) Only wallet owner can visit this route
 * (api/v1/transaction/update/:id) Only Admin can update wallet 
 * (api/v1/transaction/delete/:id) Only Admin can delete wallet 