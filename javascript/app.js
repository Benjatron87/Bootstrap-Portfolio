    var config = {
        apiKey: "AIzaSyDRl7cubdOdfy-8rUZ2x_MhKy_TZuTlFk0",
        authDomain: "portfolio-contact-5eb08.firebaseapp.com",
        databaseURL: "https://portfolio-contact-5eb08.firebaseio.com",
        projectId: "portfolio-contact-5eb08",
        storageBucket: "portfolio-contact-5eb08.appspot.com",
        messagingSenderId: "1061816302264"
      };
      firebase.initializeApp(config);

      let database = firebase.database();

    $(".reload").on('click', function(){

        window.location.reload(true);

    })

    $(".submit").on('click', function(){

        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        var phone = $("#phone").val().trim();
        var subject = $("#subject").val().trim();
        var message = $("#message").val().trim();

        database.ref().push({
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message
        });

        $(".form-control").val('');
        $("#hide").empty();

        $("#thank-you").html('Thank You For Your Response!');

        $(".submit").removeAttr('class', 'submit').addClass('reload');
    })