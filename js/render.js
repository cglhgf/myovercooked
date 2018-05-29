
function render(map) {
    var box = document.getElementsByClassName('game')[0];
    map = Array.isArray(map) ? map : map.map
    box.innerHTML = '';
    var str = '';
    var obj = [];
    var content = '';
    for (var i = 0; i < map.length; i++) {
        obj[i] = []
        obj[i].push([]);
        for (var j = 0; j < map[i].length; j++) {
            obj[i][j]='';
        }
    }
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            switch (map[i][j].type) {
                case 7 :
                const person = map[i][j].content
                    var status = '';
                    if(person) {
                    if (person.id === 0) {
                        if(person){
                            if(!person.content){
                                status = '<img src="img/leftgirl.png">';
                            }else {
                                if (Array.isArray(person.content) && person.content[0].type === 4) {
                                    status = '<img src="img/leftgirlwpl.png">';
                                }else if (person.content.type === 1) {
                                    status = '<img src="img/leftgirlwt.png">';
                                }else if (person.content.type === 0) {
                                    status = '<img src="img/leftgirlwm.png">';
                                }else if(person.content.type === 3){
                                    // 锅
                                    if(person.content.content) {
                                        if(person.content.content.length === 1){
                                            if(person.content.content[0].type === 1) {
                                                status = '<img src="img/lgirlwpotand1t.png">';
                                            } else {
                                                status = '<img src="img/lgirlwpotand1m.png">';                                                
                                            }
                                        }

                                        else if(person.content.length > 1) {
                                            if(person.content.content[0].type === 1) {
                                                status = '<img src="img/lgirlwpotand23t.png">';
                                            } else {
                                                status = '<img src="img/lgirlwpotand2m.png">';                                                
                                            }
                                        }
                                    }
                                    else{
                                        status = '<img src="img/leftgirlwpot.png">';}
                                }
                            }
                        }
                        else if('按右键'){
                                if('没拿东西'){
                                    status = '<img src="img/rightgirl.png">';
                                }else {
                                    if ('拿了盘子') {
                                        status = '<img src="img/rgirlwpl.png">';
                                    }else if ('拿了西红柿') {
                                        status = '<img src="img/rmanwpt.png">';
                                    }else if ('拿了蘑菇') {
                                        status = '<img src="img/rgirlwm.png">';
                                    }else if('拿了锅'){
                                        if('锅里放西红柿'){
                                            if('锅里有一个西红柿'){
                                                status = '<img src="img/rgirlwpot1t.png">';
                                            }else if('锅里有两个西红柿'){
                                                status = '<img src="img/rgirlwpot2t.png">';
                                            }else if('锅里有san个西红柿'){
                                                status = '<img src="img/rgirlwpot3t.png">';
                                            }
                                        }
                                        else if ('锅里放蘑菇'){
                                            if('锅里有一个蘑菇'){
                                                status = '<img src="img/rgirlwpot1m.png">';
                                            }else if('锅里有两个蘑菇'){
                                                status = '<img src="img/rgirlwpot2m.png">';
                                            }else if('锅里有san个蘑菇'){
                                                status = '<img src="img/rgirlwpot3m.png">';
                                            }
                                        }
                                        else if('锅里没放东西'){
                                            status = '<img src="img/rgirlwpot.png">';}
                                    }
                                }
                            }
                            else if('按xia键'){
                                if('没拿东西'){
                                    status = '<img src="img/frontgirl.png">';
                                }else {
                                    if ('拿了盘子') {
                                        status = '<img src="img/fgirlwp.png">';
                                    }else if ('拿了西红柿') {
                                        status = '<img src="img/fgirlwt.png">';
                                    }else if ('拿了蘑菇') {
                                        status = '<img src="img/fgirlwm.png">';
                                    }else if('拿了锅'){
                                        if('锅里放西红柿'){
                                            if('锅里有一个西红柿'){
                                                status = '<img src="img/fgirlwpotand1t.png">';
                                            }else if('锅里有两个西红柿'){
                                                status = '<img src="img/fgirlwpotand2t.png">';
                                            }else if('锅里有san个西红柿'){
                                                status = '<img src="img/fgirlwpotand3t.png">';
                                            }
                                        }
                                        else if ('锅里放蘑菇'){
                                            if('锅里有一个蘑菇'){
                                                status = '<img src="img/fgirlwpotand1m.png">';
                                            }else if('锅里有两个蘑菇'){
                                                status = '<img src="img/fgirlwpotand2m.png">';
                                            }else if('锅里有san个蘑菇'){
                                                status = '<img src="img/fgirlwpotand3m.png">';
                                            }
                                        }
                                        else if('锅里没放东西'){
                                            status = '<img src="img/fgirlwpot.png">';}
                                    }
                                }
                            }
                            else if('按上键'){

                                if('没拿东西'){
                                    status = '<img src="img/backgirl.png">';
                                }
                                else{
                                    status = '<img src="img/backgirlwitht.png">';
                                }
                            }
                        content = '<div id="player1">'+ status +'</div>';
                    }
                    else if(person.id === 1) {
                        if(person){
                            if(!person.content){
                                status = '<img src="img/leftman.png">';
                            }else {
                                if (person.content.type === 4) {
                                    status = '<img src="img/leftmanwpl.png">';
                                }else if (person.content.type === 1) {
                                    status = '<img src="img/leftmanwt.png">';
                                }else if (person.content.type === 0) {
                                    status = '<img src="img/leftmanwm.png">';
                                }else if(person.content.type === 3){
                                    // 锅
                                    if(person.content.content.length === 1){
                                        if(person.content.content[0].type === 1) {
                                            status = '<img src="img/lmanwpotand1t.png">';
                                        } else {
                                            status = '<img src="img/lmanwpotand1m.png">';                                                
                                        }
                                    }

                                    else if(person.content.length > 1) {
                                        if(person.content.content[0].type === 1) {
                                            status = '<img src="img/lmanwpotand23t.png">';
                                        } else {
                                            status = '<img src="img/lmanwpotand2m.png">';                                                
                                        }
                                    }
                                    else if(person.content.length === 0){
                                        status = '<img src="img/leftmanwpot.png">';}
                                }
                            }
                        }
                        // if('按左键'){
                        //     if('没拿东西'){
                        //         status = '<img src="img/leftgirl.png">';
                        //     }else {
                        //         if ('拿了盘子') {
                        //             status = '<img src="img/leftgirlwpl.png">';
                        //         }else if ('拿了西红柿') {
                        //             status = '<img src="img/leftgirlwt.png">';
                        //         }else if ('拿了蘑菇') {
                        //             status = '<img src="img/leftgirlwm.png">';
                        //         }else if('拿了锅'){
                        //             if('锅里放西红柿'){
                        //                 if('锅里有一个西红柿'){
                        //                     status = '<img src="img/lgirlwpotand1t.png">';
                        //                 }else if('锅里有两个西红柿或三个'){
                        //                     status = '<img src="img/lgirlwpotand23t.png">';
                        //                 }
                        //             }
                        //             else if ('锅里放蘑菇'){
                        //                 if('锅里有一个蘑菇'){
                        //                     status = '<img src="img/lgirlwpotand1m.png">';
                        //                 }else if('锅里有两个蘑菇或三个'){
                        //                     status = '<img src="img/lgirlwpotand2m.png">';
                        //                 }
                        //             }
                        //             else if('锅里没放东西'){
                        //                 status = '<img src="img/leftgirlwpot.png">';}
                        //         }
                        //     }
                        // }
                        else if('按右键'){
                            if('没拿东西'){
                                status = '<img src="img/rightgirl.png">';
                            }else {
                                if ('拿了盘子') {
                                    status = '<img src="img/rgirlwpl.png">';
                                }else if ('拿了西红柿') {
                                    status = '<img src="img/rmanwpt.png">';
                                }else if ('拿了蘑菇') {
                                    status = '<img src="img/rgirlwm.png">';
                                }else if('拿了锅'){
                                    if('锅里放西红柿'){
                                        if('锅里有一个西红柿'){
                                            status = '<img src="img/rgirlwpot1t.png">';
                                        }else if('锅里有两个西红柿'){
                                            status = '<img src="img/rgirlwpot2t.png">';
                                        }else if('锅里有san个西红柿'){
                                            status = '<img src="img/rgirlwpot3t.png">';
                                        }
                                    }
                                    else if ('锅里放蘑菇'){
                                        if('锅里有一个蘑菇'){
                                            status = '<img src="img/rgirlwpot1m.png">';
                                        }else if('锅里有两个蘑菇'){
                                            status = '<img src="img/rgirlwpot2m.png">';
                                        }else if('锅里有san个蘑菇'){
                                            status = '<img src="img/rgirlwpot3m.png">';
                                        }
                                    }
                                    else if('锅里没放东西'){
                                        status = '<img src="img/rgirlwpot.png">';}
                                }
                            }
                        }
                        else if('按xia键'){
                            if('没拿东西'){
                                status = '<img src="img/frontgirl.png">';
                            }else {
                                if ('拿了盘子') {
                                    status = '<img src="img/fgirlwp.png">';
                                }else if ('拿了西红柿') {
                                    status = '<img src="img/fgirlwt.png">';
                                }else if ('拿了蘑菇') {
                                    status = '<img src="img/fgirlwm.png">';
                                }else if('拿了锅'){
                                    if('锅里放西红柿'){
                                        if('锅里有一个西红柿'){
                                            status = '<img src="img/fgirlwpotand1t.png">';
                                        }else if('锅里有两个西红柿'){
                                            status = '<img src="img/fgirlwpotand2t.png">';
                                        }else if('锅里有san个西红柿'){
                                            status = '<img src="img/fgirlwpotand3t.png">';
                                        }
                                    }
                                    else if ('锅里放蘑菇'){
                                        if('锅里有一个蘑菇'){
                                            status = '<img src="img/fgirlwpotand1m.png">';
                                        }else if('锅里有两个蘑菇'){
                                            status = '<img src="img/fgirlwpotand2m.png">';
                                        }else if('锅里有san个蘑菇'){
                                            status = '<img src="img/fgirlwpotand3m.png">';
                                        }
                                    }
                                    else if('锅里没放东西'){
                                        status = '<img src="img/fgirlwpot.png">';}
                                }
                            }
                        }
                        else if('按上键'){

                            if('没拿东西'){
                                status = '<img src="img/backgirl.png">';
                            }
                            else{
                                status = '<img src="img/backgirlwitht.png">';
                            }
                        }

                    content = '<div id="player2">'+status+'</div>';
                    } else {
                        content = ''
                    }
                        
                    }
                    obj[i][j] = '<div class="floor">' + content + '</div>';
                    break;
                case 0 :
                    if (map[i][j].content.length === 0) {
                        if(map[i][j].put_down) {
                            obj[i][j] = '<div class="board"></div>'
                        } else {
                            obj[i][j] = '';
                        }
                    } else {
                        const object = map[i][j].content
                        if(Array.isArray(object) && object[0].type === 4) {
                            content = '<img id="plate" src="img/plate.png"/>';
                            if(object[0].content && object[0].content.length !== 0) {
                                if(object[0].content[0].state === 1) {
                                    content = '<img id="plate" src="img/cf.png"/>';
                                } else if(object[0].content[0].composition){
                                    content = '<img id="plate" src="img/outputwithtom.png"/>'
                                }
                            
                            }
                        }
                        switch(object.type) {
                            case 4: 
                                content = '<img id="plate" src="img/plate.png"/>';
                                if(object.content) {
                                    if(object.content.state === 1) {
                                        content = '<img id="plate" src="img/platewithtom.png"/>';
                                    }
                                }
                                break;
                            case 0:
                                content = '<img id="plate" src="img/mushroom.png"/>'
                                break;
                            case 1: 
                                content = '<img id="plate" src="img/tomato.png"/>'
                                break;
                            case 3:
                                        // if(object.content.length !== 0){
                                            if(object.status === 2) {
                                                content = '<img src="img/potwithtom.png">';
                                            } else if(object.status === 3) {
                                                content = '<img src="img/potwithmush.png">';                                                
                                            } else if(object.status === 0) {
                                                content = '<img src="img/pot.png">';                                                
                                            }

                                        // } else {
                                        //     content = '<img src="img/potwithmush.png">';   
                                        // }
    
                                        // // else if(object.length > 1) {
                                        //     if(person.content.content[0].type === 1) {
                                        //         status = '<img src="img/lmanwpotand23t.png">';
                                        //     } else {
                                        //         status = '<img src="img/lmanwpotand2m.png">';                                                
                                        //     }
                                        // // }
                                        // else if(person.content.length === 0){
                                        //     status = '<img src="img/leftmanwpot.png">';}
                                  
                             

                        }
                        obj[i][j] = '<div class="board">' + content + '</div>';
                    }
                    
                    break;
                case 1 :
                    content = '<img src="img/potonstove.png"/>';

                    if (map[i][j].content == null) {
                        content = '<img src="img/stove.png"/>';
                    } else if (map[i][j].content.content.length !== 0 && map[i][j].content.content[0].composition) {
                        content = '<img src="img/tompotonstove.png"/>';                        
                    } else if (map[i][j].content.status == 1 || map[i][j].content.status == 2) {
                        content = '<img src="tompotonstove.png"/>';
                    } else if (map[i][j].content.status == 3) {
                        content = '<img src="img/mushpotonstove.png"/>';
                    }
                    obj[i][j] = '<div class="board">' + content + '</div>';
                    break;
                case 3 :
                    content = '<img src="img/knifeonboard.png"/>';

                    if (map[i][j].content.length === 0) {
                        content = '<img src="img/knifeonboard.png"/>';
                    } else if (map[i][j].content[0].type == 1)
                        {
                            if(map[i][j].content[0].state == 0){
                            //加西红柿在切菜板图片
                            content = '<img src="img/cuttingboardto.png"/>';
                            }
                            if(map[i][j].content[0].state == 1){
                                //加西红柿在切菜板图片
                                content = '<img src="img/cuttingboardt.png"/>';
                            }
                            if(map[i][j].content[0].state == 2){
                                //加西红柿在切菜板图片
                                content = '<img src="img/cuttingboardtom.png"/>';
                            }
                        }
                        else if (map[i][j].content[0].type == 0)
                        {
                            if(map[i][j].content[0].state == 0){
                                //加蘑菇在切菜板图片
                                content = '<img src="img/cuttingboardmu.png"/>';
                            }
                            if(map[i][j].content[0].state == 1){
                                //加蘑菇在切菜板图片
                                content = '<img src="img/cuttingboardm.png"/>';
                            }
                            if(map[i][j].content[0].state == 2){
                                //加蘑菇在切菜板图片
                                content = '<img src="img/cuttingboardmush.png"/>';
                            }
                        }
                    obj[i][j] = '<div class="board">' + content + '</div>';
                        break;
                case 2:

                    if(obj[i][j].veggie == 0){
                        content = '<img src="img/basketwithtom.png"/>';
                    }else{
                        content = '<img src="img/basketwithtom.png"/>';
                    }
                    obj[i][j] = '<div class="board">' + content + '</div>';
                    break;
                case 4:
                    if(map[i][j].content.length === 0){
                        content = '<img src="img/output.png"/>';
                    }else if(map[i][j].content.status == 0 ){
                        content = '<img src="img/outputwithplate.png"/>';
                    }else if(map[i][j].content.status == 1 ){
                        if(map[i][j].content.type == 0){
                            content = '<img src="img/outputwithmush.png"/>';
                        }
                        if(map[i][j].content.type == 1){
                            content = '<img src="img/outputwithtom.png"/>';
                        }
                    }
                    obj[i][j] = '<div class="board">' + content + '</div>';
                    break;
                case 5:
                    content = '<img src="img/waste.png"/>';
                    obj[i][j] = '<div class="board">' + content + '</div>';
                    break;
                case 6:
                    if(map[i][j].content.length === 0){
                        content = '<img src="img/getplate.png"/>';
                    }else{
                        content = '<img src="img/haveplate.png"/>';
                    }
                    obj[i][j] = '<div class="board">' + content + '</div>';
                    break;
                case 11:
                    obj[i][j] = ''
                    
                default: 
                    obj[i][j] = ''
            }


        }
    }

    for (var i = 0; i < obj.length; i++) {

        for (var j = 0; j < obj[i].length; j++) {
            str = str + obj[i][j];
        }
    }
    box.innerHTML = str
    return str;
}
