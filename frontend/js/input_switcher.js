let flag = false;

function chooseFunc(){
    if (!flag){
        $('#function-input').css('display', 'block');
    } else {
        $('#function-input').css('display', 'none');
    }
    flag = !flag;
}
