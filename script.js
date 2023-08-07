const addCards = (items) => {
    items.forEach(item => {
    let itemToAppend = '<div class="col s4 center-align">'+
    '<div class="card medium green"><div class="card-image waves-effect waves-block waves-light"><img class="activator id=food" src="'+item.path+'">'+
    '</div><div class="card-content">'+
    '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span><p><a href="#">'+item.subtitle+'</a></p></div>'+
    '<div class="card-reveal green">'+
    '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
    '<p class="card-text black-text">'+item.description+'</p>'+
    '</div></div></div>';
    $("#card-section").append(itemToAppend)
    });
    }
    const FormSubmitted = () =>
{
    let formData = {}
    formData.title = $('#title').val()
    formData.subtitle = $('#subtitle').val()
    formData.path = $('#path').val()
    formData.description = $('#description').val()

    console.log("Form Submitted: ", formData);
    postFood(formData);
}

function postFood(food){
    $.ajax({
        url: '/api/food',
        type: 'POST',
        data: food,
        success: (result) => {
            if (result.statusCode === 201){
                alert('added food successfully');
            }
        }
    })
}

function getAllFoods(){
    $.get('/api/foods', (response) => {
        if (response.statusCode === 200) {
            addCards(response.data);
        }
        
    })
}

    $(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#submitForm').click(()=>{
        FormSubmitted();
    });
    $('.modal').modal();
    getAllFoods();
    });