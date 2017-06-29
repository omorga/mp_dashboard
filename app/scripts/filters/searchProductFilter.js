angular.module('mp-dashboard').filter('searchProductFilter', [ function() {
    return function(items, props) {
        var out = items;
        if (props.length > 3){
            var words = props.split(" ");
            for (var i = 0 ; i < out.length; i++ ){
                for (var j = 0 ; j < words.length ; j++){
                    if (out[i].description.toLowerCase().indexOf(words[j].toLowerCase()) ===-1 &&
                        out[i].name.toLowerCase().indexOf(words[j].toLowerCase()) ===-1 &&
                        out[i].stockist.toLowerCase().indexOf(words[j].toLowerCase()) ===-1){
                        out.splice(i,1);
                        i--;
                        break;
                    }
                }
            }
            return out;
        }
        else
            return items;



    };
}]);
