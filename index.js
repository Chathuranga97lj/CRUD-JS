const url = "http://localhost:3000/posts"; // its create db.json all data inside the post{} array so (url/post)

const get_posts = async () => {
    const response = await fetch(url);
    const posts = await response.json();

    for (post of posts){
        // this is the html table type i want to 
        // <tr id={id}>
        // <td>{title}</td>
        // <td>{body} </td>
        // <td><button>DEL</button></td>
        // <td><button>UPD</button></td>
        // </tr> 

        const {id, title, body} = post; // desctructer

        const tr = document.createElement("tr"); // create table row element
        tr.id = id; // asign id to row

        const td_title = document.createElement("td"); // create table data element
        td_title.innerHTML = title; // asign table data 

        const td_body = document.createElement("td");
        td_body.innerHTML = body;

        // td for delete button
        const td_delete = document.createElement("td");
        // create button
        const btn_del = document.createElement("button");
        btn_del.innerHTML = "DEL";

        btn_del.onclick = async(e) => {
            const response = await fetch(`http://localhost:3000/posts/${id}`, { // this not single cote ('url') it is (to of the kebord right coner the number 1 key ) `` >> grave sign
                method : 'DELETE',
                headers: {
                    'Constent-Type': 'application/json' // this content is important and always needed
                }
                // body: no need to delete
            });
            // location.reload();
            // const id = document.parentNode.parentNode.id;
            // console.log("====================================");
            // console.log(id);
            // console.log("===================================="); 

            // when db.json in same pacakge(all file in same place) no need to add reload
            // when item delete it delete but don't page reload, so add location reload
            if(response.status == 200){
                location.reload();
            }
        }
        
        td_delete.appendChild(btn_del);

        // update button
        const td_update = document.createElement("td");
        const btn_upd = document.createElement("button");
        btn_upd.innerHTML = "UPD";

        btn_upd.onclick = (e) => {
            localStorage.setItem('id', id)   // need static variable to store id(data)
            location.replace('/update.html');  // if this is not work user >>> location.href = '/index.html'
            // const id = document.parentNode.parentNode.id; 
            // console.log('====================================');
            // console.log(id);
            // console.log('====================================');

        };
        td_update.appendChild(btn_upd);


        tr.appendChild(td_title);
        tr.appendChild(td_body);
        tr.appendChild(td_delete);
        tr.appendChild(td_update);

        document.getElementById("tbl").appendChild(tr);
    }


}

get_posts();

// when add button click 
const redirect = () => {
    location.replace('/insert.html')
}