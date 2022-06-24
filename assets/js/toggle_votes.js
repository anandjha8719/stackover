class ToggleVote{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.ToggleVote();
    }


    toggleVote(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let votesCount = parseInt($(self).attr('data-votes'));
                console.log(votesCount);
                if (data.data.deleted == true){
                    votesCount -= 1;
                }else{
                    votesCount += 1;
                }


                $(self).attr('data-votes', votesCount);
                $(self).html(`${votesCount} Votes`);

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}
