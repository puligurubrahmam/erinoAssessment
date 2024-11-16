const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
let db = null
const db_path = path.join(__dirname,"contactList.db")
const initialServerAndDatabase = async () =>
{  
    try
    {
        db = await open({
            filename:db_path,
            driver:sqlite3.Database
        })
        app.listen(5000,()=>
        {
            console.log("Server is running at http://localhost:5000......")
        })
    }
    catch(e)
    {
        console.log(`${e.message}`)
        process.exit(1)
    }
}
initialServerAndDatabase()

app.get("/contacts",async (req,res)=>
{
    const getQuery = `SELECT * FROM contacts`;
    const response = await db.all(getQuery)
    res.send(response)
})

app.get("/contacts/:id",async (req,res)=>
{
    const {id} = req.params
    console.log(id)
    try {
        const getQuery = `SELECT * FROM contacts WHERE UserId=${id}`
        const response = await db.get(getQuery)
        if (response) {
            res.send(response);
        } else {
            res.status(404).send({ message: "Contact not found" });
        }
    } catch (e) {
        console.error("Error fetching contact:", e);
        res.status(500).send({ error: "Internal Server Error" });
    }
    
})

app.post("/contacts",async (req,res)=>
{
    const contactDetails = req.body || {}
    const {FirstName,LastName,Email,Phone,Company,JobTitle} = contactDetails
    if (!FirstName || !LastName || !Email || !Phone || !Company || !JobTitle)
    {
        return res.status(400).send({error:"Fill all the details"})
    }
    else
    {
        const getDuplicatesQuery = `SELECT * FROM contacts WHERE FirstName='${FirstName}' AND LastName='${LastName}'`;
        const duplicateContact = await db.get(getDuplicatesQuery)
        if (duplicateContact === undefined)
        {
            const insertQuery = `INSERT INTO contacts (FirstName, LastName, Email, Phone, Company, JobTitle) VALUES (
                '${FirstName}',
                '${LastName}',
                '${Email}',
                '${Phone}',
                '${Company}',
                '${JobTitle}'
                )`;
        try
        {
            const response = await db.run(insertQuery)
            res.send({success:"Added Successfully"})
        } 
        catch(e)
        {
            res.status(400).send({error:"Phone or Email already Exits"})
        }
        }
        else
        {
            res.status(500).send({ error: "Name already exists" })
        }
    }
    
})

app.delete('/contacts/:id',async (req,res)=>
{
    const id = req.params.id
    const deleteQuery = `
        DELETE FROM contacts WHERE UserId=${id};
    `
    await db.run(deleteQuery)
    res.send({success:"Contact Deleted Successfully"})
})

app.put("/contacts/:id",async (req,res)=>
{
    const {id} = req.params
    const contactDetails = req.body || {}
    const {FirstName,LastName,Email,Phone,Company,JobTitle} = contactDetails
    if (!FirstName || !LastName || !Email || !Phone || !Company || !JobTitle)
    {
        return res.status(400).send({error:"Fill all the details"})
    }
    else
    {
        const getDuplicatesQuery = `SELECT * FROM contacts WHERE FirstName='${FirstName}' AND LastName='${LastName}' AND UserId != ${id}`;
        const duplicateContact = await db.get(getDuplicatesQuery)
        console.log(duplicateContact)
        if (duplicateContact===undefined)
        {
            const updateQuery = `
            UPDATE contacts
            SET
            FirstName = '${FirstName}',
            LastName = '${LastName}',
            Email = '${Email}',
            Phone = '${Phone}',
            Company = '${Company}',
            JobTitle = '${JobTitle}'
            WHERE UserId = ${id};
        `;

        try
        {
            const response = await db.run(updateQuery)
            if(response.changes>0)
            {
                res.send({success:"Contact Updated Successfully"})
            } 
        } 
        catch(e)
        {
            res.status(400).send({error:"Phone or Email already Exits"})
        }
        }
        else
        {
            res.status(500).send({ error: "Name already exists" })
        }
    }
})