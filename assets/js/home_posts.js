{
    console.log("Welcome to the posts");
    let successNotification = function(successText){
        new Noty({
            theme:'relax',
            text: successText,
            type: 'success',
            layout: 'topRight',
            timeout: 1500
        }).show();
    }
    let errorNotification = function(errorText){
        new Noty({
            theme:'relax',
            text: errorText,
            type: 'error',
            layout: 'topRight',
            timeout: 1500
        }).show();
    }
    let createComment = function(commentForm,postId){
        console.log("The comment form --> ",commentForm);
        console.log("The Post id ",postId);
        $(commentForm).submit(function(e){
            e.stopImmediatePropagation();
            e.preventDefault();
    
            console.log("it is working darlene");
            $.ajax({
                type: "post",
                url: "/comments/create",
                data: $(commentForm).serialize(),
                success: function (data) {
                    console.log("The comment data received from the server is ",data);
                    // console.log("post id is ",post._id);
                    let newComment = newCommentDom(data.data.comment);
                    $(`.post-comments-${postId}`).prepend(newComment);
                    successNotification("Comment Created Successfully");
                    deleteComment($(' .delete-comment-btn',newComment));
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    let newCommentDom = function(comment){
        return $(`<li id="comment-${comment._id}">
                        <small>
                            <a href="/comments/destroy/${comment._id}" class = "delete-comment-btn">X</a>
                        </small>
                        <p>
                        ${comment.content}
                        </p>
                        <small>
                        ${comment.user.name}
                        </small>
                 </li>`);
    } 
    let deleteComment = function(deleteLink){
        console.log(deleteLink);
     $(deleteLink).click(function(e){
         console.log("The url for the route is ",$(deleteLink).prop('href'));
        e.preventDefault();
        $.ajax({
            type: "get",
            url: $(deleteLink).prop('href'),
            success: function (data) {
                console.log("data received after deletion from server " ,data);
                $(`#comment-${data.data}`).remove();
                successNotification("Comment Deleted Successfully");
            },
            error: function(error){
                console.log(error.responseText);
            }
        });
     })
    }
    //createPost function will send the form data from the browser to the server(to the posts controller)
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function (e) { 
            e.preventDefault();
            //prevent default will prevent the default functionality of submit button

            //after that we'll submit manually using ajax request to the server
            $.ajax({
                type: "post",
                url: "/posts/create",
                data: newPostForm.serialize(), //this will convert the form data into jason

                success: function (data) {
                    // data.data.post.populate('user');
                    
                    let newPost = newPostDom(data.data.post);
                    console.log(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    //after successfully pushing the post into the dom show the notification
                    successNotification('Post Created Successfully');
                    deletePost($(' .delete-post-btn',newPost));

                    createComment($(' .new-comment-form',newPost),data.data.post._id);
                    console.log(data);
                },
                error: function(error){
                  console.log(error.responseText);
                }
            });
            
        });
    }
    //Method to create a post in DOM
    let newPostDom = function(post){
            return $(`<li id = "post-${post._id}">
                       
                        <small>
                        <a class = "delete-post-btn" href="/posts/destroy/${post._id}">X</a>
                        </small>
                       
                        ${post.content}
                        <br>
                        <small>
                        ${post.user.name}
                        </small>
                        <div class="post-comments">

                            <form action="/comments/create" method="post" class = "new-comment-form">
                                <input type="text" name="content" placeholder="Comment here..">
                                <input type="hidden" name="post" class = "post-id" value="${post._id}">
                                <input type="submit" value="Add Comment">
                            </form>
                            <div class = "post-comments-list">
                            <ul class="post-comments-${post._id}">
                            </ul>
                            </div>
                        </div>
                        <!-- The user need not be logged in while looking at the comments -->
                   </li>`)
    }

    // method to delete a post from dom
    let deletePost = function(deleteLink){
        //delete link par jab click hoga tabhi post delete hogi(from the dom)
        console.log('ajax delete post called ');
        $(deleteLink).click(function(e){
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                 //we will remove the post from the dom
                 $(`#post-${data.data.post_id}`).remove();
                 //after successfully deleting the post show the notification
                 successNotification('Post Deleted Successfully');
                },
                error: function(error){
                  console.log(error.responseText);
                }
            })
        });
    }
    let allDeletePostLinks = $('.delete-post-btn');//it selects all the delete post buttons in the dom

    for(link of allDeletePostLinks){
        deletePost(link);
    }

    //we'll have to call the createComment function along with all the posts when they are crated dynamically
    //also for the posts already present in the dom we'll have to call the createComment function for them also
    let allCommentForms = $('.new-comment-form');
    for(corm of allCommentForms){
        let postId = $(' .post-id',corm).val();
        console.log("Comment form hai --> ",corm);
        console.log("Post id hai --> ",postId);
        createComment(corm,postId);
    }

    // we'll have to call the deleteComment function for every comment of every post
    let allDeleteCommentLinks = $('.delete-comment-btn');
    console.log("ye raha --> ",allDeleteCommentLinks);
    for(link of allDeleteCommentLinks){
        deleteComment(link);
    }

    createPost();
}