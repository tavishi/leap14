
var name_categories = { meal: 'Mid day meals', water: 'Drinking Water', sanitation: 'Build a Toilet', computer: 'Digital Schools', tratio: 'Volunteer to Teach', cratio: 'Build/Repair a Classroom',road:'Connect a School',rte:'Give a child his right' ,library:'library',electricity:'Light a school'};
var description_categories = { meal: '45% schools in The coutry don\'t serve mid day meals', water: 'Desc', sanitation: 'Desc', computer: 'Desc', tratio: 'Desc', cratio: 'Desc', road: 'Desc', rte: 'desc', library: 'decs', electricity: 'Desc' };
//var data = [{"2005":"10.7","2006":"13.4","2007":"14.3","2008":"14.1","2009":"16.7","2010":"18.1","2011":"20.5"}];
//var x = d3.scale.linear()
//    .domain([0, d3.max(data)])
//    .range([0, 420]);
//d3.select(".chart")
//  .selectAll("div")
//    .data(data)
//  .enter().append("div")
//    .style("width", function (d) { return x(d) + "px"; })
//    .text(function (d) { return d; });



jQuery(document).ready(function () {
    jQuery('#mid').click(function () {

        alert('MID DAY MEALS SELECTED')


    });


    jQuery(".category").mouseover(function () {
        //if (jQuery(this).data('state') == 0) {
        //     var current = jQuery(this).html();

        var id = jQuery(this).attr('id');

        jQuery(this).html(description_categories[id]);
        jQuery().hide;
       


    });

    jQuery(".category").mouseout(function () {
        var id = jQuery(this).attr('id');
        jQuery(this).html(name_categories[id]);

    });


});