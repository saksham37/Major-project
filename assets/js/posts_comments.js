// {
//     console.log("posts_comments.js loaded");
//   let createComment = function(){
//       console.log("working till createComment ");
//       let commentForm = $('.new-comment-form');
//       console.log("commentForm--> ",commentForm);
//       for(com of commentForm){
//           console.log("inside the loop");
//           console.log(com);
//             com.submit(function (e) { 
//                 e.preventDefault();
//                 cosole.log("comment ajax working ");

//                 // //making an ajax request to the server to save the comment's data and store the comment's id into the post
//                 $.ajax({
//                     type: "post",
//                     url: "/comments/create",
//                     data: comment.serialize(),
//                     success: function (response) {
//                         console.log(response);
//                     },
//                     error: function(error){
//                         console.log(error.responseText);
//                     }
//                 });
          
//       });
//     }
//   }
//   // createComment();
// }