# Backend for Notes App

This backend is hosted via render [https://notes-app-h8kr.onrender.com/test](https://notes-app-h8kr.onrender.com/test) click on the link to check.


### Fetch Notes from DB via GET method

* To fetch all Notes in database, need to use this link [https://notes-app-h8kr.onrender.com/notes](https://notes-app-h8kr.onrender.com/notes) to fetch notes
* This will fetch all the presented data in database

### Create Notes in DB via POST method

* To create Note in database, need to send data via json format with title and body.
* Method should be used is POST
* URL format `/notes`
* ```json
  {
      "title": "Heading",
      "body": "Paragraph"
  }
  ```

### Update Notes in DB via PUT method

* To update note we need to send data via json format with title and body
* Method should be used is PUT
* URL format `/notes/:id`
* If the id not presented in table it will not update any records (notes) in the table

### Delete Notes in Db via DELETE method

* To delete note we need to send id paramater in URL to delete note in table
* Method should be used is DELETE
* URL format `/notes/:id`
* If the id not found in the table it will not delete any records (notes) in the table
