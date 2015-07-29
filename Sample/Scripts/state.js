
function dropdownlist(listindex) {

    document.district_form.subcategory.options.length = 0;
    switch (listindex) {

        case "AP":
            document.district_form.subcategory.options[0] = new Option("Select Sub-Category", "");
            document.district_form.subcategory.options[1] = new Option("Adilabad", "ADILABAD");
            document.district_form.subcategory.options[2] = new Option("Anantapur", "ANANTAPUR");
            document.district_form.subcategory.options[3] = new Option("Chittoor", "CHITTOOR");
            document.district_form.subcategory.options[4] = new Option("Cuddapah", "CUDDAPAH");

            document.district_form.subcategory.options[5] = new Option("East Godavari", "EAST GODAVARI");
            document.district_form.subcategory.options[6] = new Option("Guntur", "GUNTUR");
            document.district_form.subcategory.options[7] = new Option("Hyderabad", "HYDERABAD");
            document.district_form.subcategory.options[8] = new Option("karimnagar", "KARIMNAGAR");
            document.district_form.subcategory.options[9] = new Option("Khammam", "KHAMMAM");
            document.district_form.subcategory.options[10] = new Option("Krishna", "KRISHNA");


            document.district_form.subcategory.options[11] = new Option("Kurnool", "KURNOOL");
            document.district_form.subcategory.options[12] = new Option("Mahbubnagar", "MAHBUBNAGAR");
            document.district_form.subcategory.options[13] = new Option("Medak", "MEDAK");
            document.district_form.subcategory.options[14] = new Option("Nalgonda", "NALGONDA");
            document.district_form.subcategory.options[15] = new Option("Nellore", "NELLORE");
            document.district_form.subcategory.options[16] = new Option("Nizamabad", "NIZAMABAD");
            document.district_form.subcategory.options[17] = new Option("Prakasam", "PRAKASAM");
            document.district_form.subcategory.options[18] = new Option("Rangareddi", "RANGAREDDI");
            document.district_form.subcategory.options[19] = new Option("Srikakulam", "SRIKAKULAM");
            document.district_form.subcategory.options[20] = new Option("Vishakhapatnam", "VISHAKHAPATNAM");
            document.district_form.subcategory.options[21] = new Option("Vizianagaram", "VIZIANAGARAM");
            document.district_form.subcategory.options[21] = new Option("Warangal", "WARANGAL");
            document.district_form.subcategory.options[22] = new Option("West Godavari", "WEST GODAVARI");











            break;

        case "Goa":
            document.district_form.subcategory.options[0] = new Option("Select Sub-Category", "");
            document.district_form.subcategory.options[1] = new Option("North Goa", "NORTH GOA");
            document.district_form.subcategory.options[2] = new Option("South Goa", "SOUTH GOA");



            break;

    }
    return true;
}

