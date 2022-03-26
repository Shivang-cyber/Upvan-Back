# Upvan-Back
This is the backend server for Upvan App. It is responsible for all the transactions and management of the database that happens on the website.
<h3 align="center">https://upvan-back.herokuapp.com/pr/A</h3>


<h1>Usage</h1>
There are several gateway to use here, primarily for development and testing purposes. They are listed below.
<hr>
<h2>Client</h2>
<ul>
<li>Client Creation</li>
</ul>
To create a client add req body to the post request in give below format.
```
{
    mail: Required,
    details: {
      name: Required,
      mob: Required,
      address: Required,
    }
  }
```
<div align="center"><div>heroku</div></div>
<code>javascript
function test() {
  console.log("notice the blank line before this function?");
}
</code>