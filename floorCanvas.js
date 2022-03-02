var drawOuter,
    drawBlock,
    drawTable;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = 600;
const HEIGHT = 700;

canvas.width = WIDTH;
canvas.height = HEIGHT;

let outerLayout = [];
let blockLayout = [];
let tableLayout = [];

function init() {

    return setInterval(draw, 10);
}

function draw() { // console.log(outerLayout)
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    for (let obj of outerLayout) {
        ctx.lineTo(obj.x, obj.y);

    }
    ctx.stroke();


    for (let obj of blockLayout) {
        ctx.beginPath();
        for (let block of obj['block']) {
            ctx.lineTo(block.x, block.y);
        }
        ctx.stroke();

    }

    for (let obj of tableLayout) {
        ctx.beginPath();
        for (let table of obj['table']) {
            ctx.rect(table.x, table.y, table.width, table.height);
        }
        ctx.closePath();
        ctx.fill();
        // ctx.beginPath();
        // for (let table of obj['table']) {
        //     ctx.lineTo(table.x, table.y);
        // }
        // // ctx.fill();
        // ctx.stroke();

    }

}


function layerDraw(layer) {
    if (layer == 'outer') {
        drawOuter = true;
        drawBlock = false;
        drawTable = false;

        document.getElementById("drawTitle").innerHTML = "Draw Outer Layout";
        document.getElementById("layoutArray").innerHTML = JSON.stringify(outerLayout);
    } else if (layer == 'block') {
        drawOuter = false;
        drawBlock = true;
        drawTable = false;

        blockLayout.push({ block: [] });

        document.getElementById("drawTitle").innerHTML = "Draw Block Layout";
        document.getElementById("layoutArray").innerHTML = JSON.stringify(blockLayout);

    } else if (layer == 'table') {
        drawOuter = false;
        drawBlock = false;
        drawTable = true;

        tableLayout.push({ table: [] });

        document.getElementById("drawTitle").innerHTML = "Draw Table Layout";
        document.getElementById("layoutArray").innerHTML = JSON.stringify(tableLayout);

    } else if (layer == 'resetDraw') {
        drawOuter = false;
        drawBlock = false;
        drawTable = false;
    }
}

function submitCood() {
    var x = document.getElementById("xCood").value;
    var y = document.getElementById("yCood").value;
    console.log(outerLayout, drawOuter, drawBlock, drawTable)
    if (drawOuter) {
        outerLayout.push({
            x: x - canvas.offsetLeft,
            y: y - canvas.offsetTop
        });
        document.getElementById("layoutArray").innerHTML = JSON.stringify(outerLayout);

    } else if (drawBlock) {

        blockLayout[blockLayout.length - 1].block.push({
            x: x - canvas.offsetLeft,
            y: y - canvas.offsetTop
        });
        document.getElementById("layoutArray").innerHTML = JSON.stringify(blockLayout);

    } else if (drawTable) {

        tableLayout[tableLayout.length - 1].table.push({
            x: x - canvas.offsetLeft,
            y: y - canvas.offsetTop,
            height: 60,
            width: 50
        });
        document.getElementById("layoutArray").innerHTML = JSON.stringify(tableLayout);

    }
    console.log(outerLayout)

}

function canvasClick(e) {
    console.log(e.pageX, e.pageY);
    document.getElementById("xCood").value = e.pageX;
    document.getElementById("yCood").value = e.pageY;
    submitCood();
}

function layerResize(layer) {
    if (layer == 'outer') {
        console.log(outerLayout)

        let tableStructure = '<table id="tblstructure">';

        tableStructure += "<tr><th>X</th><th>Y</th></tr>";
        let index = 0;
        for (let obj of outerLayout) {
            tableStructure += `<tr><td>X:<input onchange='changeValue(event)' type='number' id='x_${index}' value='${
        obj.x
      }'/> </td><td>Y:<input onchange='changeValue(event)' type='number' id='y_${index}' value='${
        obj.y
      }'/> </td></tr>`;
            index++;
        }

        tableStructure += '</table>';


        document.getElementById("resizeForm").innerHTML = tableStructure;

    } else if (layer == 'block') {
        let tableStructureArr = []
        let block_index = 0;
        for (let objOut of blockLayout) {
            let tableStructure = '<table id="tblstructure">';

            tableStructure += "<tr><th>X</th><th>Y</th></tr>";
            let index = 0;
            for (let obj of objOut['block']) {
                tableStructure += `<tr><td>X:<input onchange='changeBlockValue(event,${block_index})' type='number' id='x_${index}' value='${
          obj.x
        }'/> </td><td>Y:<input onchange='changeBlockValue(event,${block_index})' type='number' id='y_${index}' value='${
          obj.y
        }'/> </td></tr>`;
                index++;
            }

            tableStructure += '</table>';
            console.log(tableStructure)
            tableStructureArr.push(tableStructure);
            block_index++;
        }
        console.log(tableStructureArr)
        document.getElementById("resizeForm").innerHTML = tableStructureArr;
    } else if (layer == 'table') {
        let tableStructureArr = []
        let table_index = 0;
        for (let objOut of tableLayout) {
            let tableStructure = '<table id="tblstructure">';

            tableStructure += "<tr><th>X</th><th>Y</th><th>Height</th><th>Width</th></tr>";
            let index = 0;
            for (let obj of objOut['table']) {
                tableStructure += `<tr>
                <td>X:<input onchange='changeTableValue(event,${table_index})' type='number' id='x_${index}' value='${
          obj.x
        }'/> </td>
                <td>Y:<input onchange='changeTableValue(event,${table_index})' type='number' id='y_${index}' value='${
          obj.y
        }'/> </td>
                <td>Height:<input onchange='changeTableValue(event,${table_index})' type='number' id='height_${index}' value='${
          obj.height
        }'/> </td>
                <td>Width:<input onchange='changeTableValue(event,${table_index})' type='number' id='width_${index}' value='${
          obj.width
        }'/> </td>
                </tr>`;
                index++;
            }

            tableStructure += '</table>';
            console.log(tableStructure)
            tableStructureArr.push(tableStructure);
            table_index++;
        }
        console.log(tableStructureArr)
        document.getElementById("resizeForm").innerHTML = tableStructureArr;
    }
}


function changeValue($event) {
    let index = $event.target.id.split('_')[1];
    let value = $event.target.value;

    if ($event.target.id.split('_')[0] == 'x') {
        outerLayout[index].x = parseInt(value);
    } else {
        outerLayout[index].y = parseInt(value);
    }

}


function changeBlockValue($event, block_index) {
    let index = $event.target.id.split('_')[1];
    let value = $event.target.value;

    console.log(block_index, index, value)

    if ($event.target.id.split('_')[0] == 'x') {
        blockLayout[block_index].block[index].x = parseInt(value);
    } else {
        blockLayout[block_index].block[index].y = parseInt(value);
    }

}

function changeTableValue($event, table_index) {
    let index = $event.target.id.split('_')[1];
    let value = $event.target.value;

    console.log(table_index, index, value, $event.target.id)

    if ($event.target.id.split('_')[0] == 'x') {
        tableLayout[table_index].table[index].x = parseInt(value);
    } else if ($event.target.id.split('_')[0] == 'y') {
        tableLayout[table_index].table[index].y = parseInt(value);
    } else if ($event.target.id.split('_')[0] == 'height') {
        tableLayout[table_index].table[index].height = parseInt(value);
    } else if ($event.target.id.split('_')[0] == 'width') {
        tableLayout[table_index].table[index].width = parseInt(value);
    }

}

init();

canvas.onclick = canvasClick