
# Contact Management

Contact Management feature helps users of the system to keep a track of important contact information of customers/clients. 
Where users add,view,update,delete contactdetails all in one place.

# Clone the Repository

```git clone https://github.com/puligurubrahmam/erinoAssessment.git```

# Install Dependencies

```npm install```

# To Start Backend Server 

run ```nodemon start```

# To Start Frontend Server 

run ```npm start```

# Database Schema

    UserId INTERGER PRIMARY KEY AUTO_INCREMENT,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Email TEXT UNIQUE NOT NULL,
    Phone TEXT UNIQUE NOT NULL,
    Company TEXT NOT NULL,
    JobTitle TEXT NOT NULL

# How Project Works

It adds contacts only if it is unique.
It Throws error that "Name already exists" when the user enters FirstName and LastName that is already exists in the database

If the email or phone number is already exists in the database which is entered by the user, It Throws the error that "Email or Phone already exists".

If the User tries to add contact with some empty details then it throws the error that "Fill all the details"

```Contacts which you added will be displayed by clicking contacts on the top right corner```

```All contacts are displayed in a tabular format```

==> By clicking on  edit icon you can EDIT that Contact Details

==> By clicking on delete icon you can DELETE that contact

```This is how you can add,view,update and delete the contacts```


