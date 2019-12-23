$(".devour").click(function(){
   const burgerId =$(this).val()
   $.ajax({
    method: "PUT",
    url: "/api/devour",
    data: { id: burgerId}
  })
    .then(function(results ) {
        location.reload()
      console.log(results)
    });
})

$("#addBurger").click(function(){
    const burgerName =$("#burgerName").val()
    console.log(burgerName)
    $.ajax({
     method: "Post",
     url: "/api/devour",
     data: { name: burgerName }
   })
     .then(function(results ) {
         location.reload()
       console.log(results)
     });
})