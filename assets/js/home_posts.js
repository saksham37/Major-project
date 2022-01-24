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

                            <form action="/comments/create" method="post">
                                <input type="text" name="content" placeholder="Comment here..">
                                <input type="hidden" name="post" value="${post._id}">
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


    createPost();
}