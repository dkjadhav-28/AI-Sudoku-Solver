//loading puzzle 

//issues in global variables
function blankPuzzle(){

    let num=0;
    for(let i=1;i<=3;i++)
    {
        //creating row 
        const container = document.getElementById("container");
        //console.log(container);
        
        const row = document.createElement("div");
        row.className = "row m-0";
        row.id= i+"outerRow";
        container.append(row);

        for(let j=1;j<=3;j++)
        {
            const column = document.createElement("div");
            column.className="col-4 bigBox p-0";
            row.append(column);

            const box = document.createElement("div");
            box.className="container p-0";
            column.append(box);
            for(let k=1;k<=3;k++)
            {
                const innerRow = document.createElement("div");
                innerRow.className  = "row m-0";
                innerRow.id=k+"innerRow";
                box.append(innerRow);
                for(let l=1;l<=3;l++)
                {
                    const innerColumn = document.createElement("div");

                    const inp = document.createElement('input');
                    
                    inp.id = "c"+num;
                    inp.type="number";
                    inp.className="cell";
                    inp.min="1";
                    inp.max="9";
                    innerColumn.append(inp);
            
                    
                    innerColumn.className = "col-4 smallBox p-0";
                    innerColumn.style.overflow="hidden";
                    innerRow.append(innerColumn);
                    
                    num+=1;
                }
                
            }

           
        }
    }
}

function generateInpt()
{
    //logic to convert box-by-box read to row-by-row read
let map={};
let key;
let arrr=[];
let ar=[];
let ids=[];
let id=-1;
let t=0;
let previd=-1;
for(i=0;i<9;i++)
{
    let arr=[];//if let not mention we can access it from console;
    let Idss=[];
    let arrr1=[];
    for(j=0;j<9;j++)
    {
        id+=1;
        let val = document.getElementById("c"+id).value;
        if(val=="")
        {val = -1;
            document.getElementById("c"+id).style.color="#5df3add6";//#78f3ba
        }
        else
        val = Number(val);
        arr.push(val);
        arrr1.push(val);
        Idss.push(id);
        
        if(j==2 || j==5)
        {
            //7 since +1 in every step complusory so add 6
            id+=6;
        }
        
    }
    ids.push(Idss);
    ar.push(arr);
    arrr.push(arrr1);
    if(i==2 || i==5)
    {
        //add 27
        
        t=0;
        previd+=27;
        id=previd;
    }
    else
    {
        id=previd;
        t+=3;
        id+=t;
    }
    
}

//Mapping box wise id to rowise id;

for(i=0;i<9;i++)
{
    for(j=0;j<9;j++)
    {
        key=i.toString()+j;
        map[key] = ids[i][j];
    }
}


   let ans =  startSolve(ar,map);
    let n=1;
   display(arrr,ans,map,n);

 



}
function startSolve(sudoku,map){

   let ans =  solve(sudoku,0,0,map)
    if(ans)
        {
            console.log("Solved Sudoku:\n");
            //print(sudoku);
            console.log(sudoku);
            
            
            
        }
        else if(!ans)
        {
            
            alert("Sudoku Unsolvable");

        }
        return sudoku;
}

function clearPuzzle(){
    for(i=0;i<81;i++)
    {
        document.getElementById("c"+i).value="";
        document.getElementById("c"+i).style.color="#8ca4ecc2";
    }
}

function solve(ar,row,col,map)
{
    
        
    
    let i,j,x,y;
    
    //target cell
    
        let l = new Array(2);
        
        l = getNextCell(ar,row,col);
        
        
        
        if(l[0]==-2)//no more blank cell return solved || true;
        return true;
        
        else
        {
            //coordinates of new blank cell;
            x=l[0];y=l[1];
            // let key = x.toString()+y;    
            // let id = map[key];
            // let div = document.getElementById("c"+id);
            
            for(i=1,j=1;i<=9;i++)
            {
                
                
                let ans = isSafe(ar,x,y,i);
                if(ans)
                {
                    //ar[x][y] =i;
                    
                    
                        ar[x][y]=i;
                        
                    //newprint(ar,x);
                    //newDisplay(map,x,y,i);
        
                    if(solve(ar,x,y,map))
                    {
                        
                        
                        return true;
                    }
                    else
                    {
                        ar[x][y]=-1;
                        continue;
                    }
                    
                }
                else
                {
                    
                    continue;
                }
            }
            if(i==10)
            {
                //div.value="";
                ar[x][y]=-1;
                return false;
            }
            
            
            
        }
        return true;

}

function getNextCell(ar,r,c)
{
    let i,j;
	    let l = new Array();
	    for(i=r;i<9;i++)
	    {
	        for(j=c;j<9;j++)
	        {
	            if(ar[i][j]==-1)
	            {
	                l.push(i);l.push(j);
                    
	                return l;
	            }
	        }
	        c=0;
	    }
	    l.push(-2);
        
	    return l;
}

function isSafe(ar,row,col,num)
{
 
    let i,j,rowst,colst;
        //rowise
        
        for(i=0;i<9;i++)
        {
            if(ar[row][i]==num && col!=i)
            return false;
        }
        //columnwise
        for(i=0;i<9;i++)
        {
            if(ar[i][col]==num && i!=row)
            return false;
        }
        
        //boxwise
        if(row<3)
        rowst=0;
        else if(row>=3 && row<6)
        rowst = 3;
        else
        rowst = 6;
        
        if(col<3)
        colst=0;
        else if(col>=6)
        colst = 6;
        else
        colst=3;
        
        for(i=rowst;i<rowst+3;i++)
        {
            for(j=colst;j<colst+3;j++)
            {
                if((ar[i][j]==num) && (row!=i && col!=j))
                return false;
            }
        }
        return true;
}

function display(arr,ans,map,n){

for(let i=0;i<9;i++)
{
    for(let j=0;j<9;j++)
    {
        if(arr[i][j]==-1)
        {
        let id = map[i.toString()+j];

        let div = document.getElementById("c"+id);
        // div.style.backgroundColor="#8df2c3a6";

        setTimeout(() => {div.style.backgroundColor="#8df2c3a6";div.value=ans[i][j];},(50+(400*n)));
        //div.value = ans[i][j];
        arr[i][j]=ans;
        n+=1;
        display(arr,ans,map,n);
        setTimeout(() => {div.style.removeProperty('background-color')},(50+(400*n)));
        }
    }
}

    
}
function newDisplay(map,r,c,num)
{
    
    let key = r.toString()+c;    
    let id = map[key];
    
    let div = document.getElementById("c"+id);
    div.style.backgroundColor="#8df2c3a6";                                //#02f383a8#8becbfeb
    
    div.value=num; 
    let i=0;
    // console.log("entered");
    // while(i<19990000){i++;if(i==19989999){//div.style.removeProperty("background-color");
    // }}i=0;
    // console.log("exit");
    div.style.removeProperty("background-color");
    
return;
}