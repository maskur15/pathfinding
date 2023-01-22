/**
 * Created by ASUS on 15-Aug-21.
 */
const btn= document.querySelector("#number01")
const btn2=document.querySelector("#number02");
const reset= document.querySelector("#reset")
const bfs_button=document.querySelector("#bfs")
const block_button=document.querySelector("#block")
const map=new Map()
var arr = new Array(8)
var visit=new Array(8)
start_id="number00";
dest_id="number77";
var flag=0;
stFlag=2
var dtclick=0
var stclick=0;
var  isBlock=false
alert("*****Path Finding***** \n" +
    "***How to run : " +
    "-> Green Node is the starting Node\n" +
    "->Red Node is the destination Node\n" +
    "->To move a Node first clik the Node you want to move and then clik any black NOde\n" +
    "->TO add BLOck : First CLick the ADD BLOCK button and then click in any black NOde\n" +
    "->To start BFS click BFS BUTTON\n" +
    "->TO reset click REset\n")
class Qitem{
    constructor(){
        this.row=0
        this.col=0
        this.dist=0
    }

}
class  Queue{
    constructor(){
        this.items=[]
    }
    isEmpty(){
        return this.items.length==0;
    }
    enqueue(element){
        this.items.push(element)
    }
    dequeue(){
        if(this.isEmpty())
            return "underflow";
        return this.items.shift()
    }
    front(){
        if(this.isEmpty())
        {
            return "No element"
        }
        return this.items[0];
    }
    printQueue()
    {
        var str="";
        for(var i=0;i<this.items.length;i++)
            str+=this.items[i]+" ";
        return str;
    }
}

var source= new Qitem();
source.row=0;source.col=0; source.dist=0;
var dest=new Qitem();
dest.row=7; dest.col=7; dest.dist=0;
function createNodeMatrix() {
    for(var i=0;i<visit.length;i++)
    {
        visit[i]=[]
    }
    for(var i=0;i<visit.length;i++)
    {
        for(var j=0;j<visit.length;j++)
        {
            visit[i][j]=false;
        }
    }
}
createNodeMatrix()
function  bfs() {
    var q= new Queue();
    var ans = new Queue();
    q.enqueue(source)
    visit[source.row][source.col]=true

    while(q.isEmpty()==false){
        var str1=""
        var str2=""
        var row=q.front().row;
        var col=q.front().col;
        str1=str1+row+col
        var value=q.front();
        ans.enqueue(q.front())
        q.dequeue();
        var ele=document.getElementById("number"+row+""+col)
        if(ele.id!=start_id&&ele.id!=dest_id)
        {
            ele.style.backgroundColor="WHITE"
        }

        if(row==dest.row&&dest.col==col)
        {
            console.log("FInnddddd");
           var v=""+source.row+""+source.col;
           var  d=""+dest.row+""+dest.col;
            for(var i=1;i<=100;i++)
            {
                var element=document.getElementById("number"+map.get(d))

                console.log(d)
                d=map.get(d)
                if(d==v)
                {
                  console.log(d);  break;
                }
                element.style.backgroundColor="BLUE"

            }


            return 0;
        }
        if(row-1>=0&&visit[row-1][col]==false)
        {
            var newitem= new Qitem();

            newitem.row=row-1; newitem.col=col;
           q.enqueue(newitem); visit[row-1][col]=true;
           str2+=newitem.row+""+newitem.col
            map.set(str2,str1)
            str2=""

        }
        if(row+1<arr.length&&visit[row+1][col]==false){
            var newitem= new Qitem();

            newitem.row=row+1; newitem.col=col;
            q.enqueue(newitem); visit[row+1][col]=true;
            str2+=newitem.row+""+newitem.col
            map.set(str2,str1)
            str2=""
        }
        if(col-1>=0&&visit[row][col-1]==false)
        {
            var newitem= new Qitem();

            newitem.row=row; newitem.col=col-1;
            q.enqueue(newitem); visit[row][col-1]=true;
            str2+=newitem.row+""+newitem.col
            map.set(str2,str1)
            str2=""

        }
        if(col+1<arr.length&&visit[row][col+1]==false){
            var newitem= new Qitem();

            newitem.row=row; newitem.col=col+1;
            q.enqueue(newitem); visit[row][col+1] = true;
            str2+=newitem.row+""+newitem.col
            map.set(str2,str1)
            str2=""

        }

    }

    return "Can not reach";
}

function colorAll() {
    for(var i=0;i<arr.length;i++)
    {
        arr[i]=[]
    }
    for(var i=0;i<arr.length;i++)
    {
        for(var j=0;j<arr.length;j++)
        {
            arr[i][j]="#number"+i+j;
        }
    }
    for(var i=0;i<arr.length;i++)
    {
        for(var j=0;j<arr.length;j++)
        {
            const button = document.querySelector(arr[i][j]);
            button.addEventListener('click',function () {
                   if(isBlock)
                   {
                    if(button.id!=start_id&&button.id!=dest_id)
                    {
                        button.style.backgroundColor="PINK" ;
                        visit[parseInt(button.id.charAt(6))][parseInt(button.id.charAt(7))]=true;
                        console.log(visit)

                    }

                   }
                    if(dtclick==0&&stclick==0&&start_id==button.id)
                    {
                        stclick=1;
                        button.style.backgroundColor="Black"
                        isBlock=false;

                    }
                    if(dtclick==0&&stclick==1&&start_id!=button.id&&button.id!=dest_id &&
                        visit[parseInt(button.id.charAt(6))][parseInt(button.id.charAt(7))]==false)
                    {
                        stclick=0;
                        button.style.backgroundColor="green";
                        start_id=button.id;
                    }
                    if(stclick==0&&dtclick==0&&dest_id==button.id)
                    {
                        dtclick=1; button.style.backgroundColor="black";
                        isBlock=false;

                    }
                    if(stclick==0&&dtclick==1&&dest_id!=button.id&&button.id!=start_id &&
                        visit[parseInt(button.id.charAt(6))][parseInt(button.id.charAt(7))]==false)
                    {

                            dtclick=0;
                            button.style.backgroundColor="red";
                            dest_id=button.id;

                    }



            })
        }


    }
}
colorAll()

reset.addEventListener('click',function (a) {
    stclick=0;
    start_id="number00"
    dest_id="number77";
    dtclick=0;
    source.row=0;source.col=0; source.dist=0;
    dest.row=7; dest.col=7; dest.dist=0;
    createNodeMatrix();
    var elements=document.getElementsByClassName("number")
    for(var i=0;i<elements.length;i++)
    {
        if(elements[i].id=="number00")
        {
            elements[i].style.backgroundColor="green"
        }
        else if(elements[i].id=="number77")
        {
            elements[i].style.backgroundColor="red"
        }
        else{
            elements[i].style.backgroundColor="black"

        }
    }


})

block_button.addEventListener('click',function () {
    isBlock=true;
})
bfs_button.addEventListener('click',function(a) {
   console.log(start_id)
    console.log(dest_id)
    source.row=parseInt(start_id[6]); source.col=parseInt(start_id[7]);
    dest.row=parseInt(dest_id[6]); dest.col=parseInt(dest_id[7]);
    console.log(source)
    console.log(dest)
    bfs();
})
