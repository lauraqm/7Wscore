
// class Utils {
//     constructor() {}

//     static htmlToElement = (stringHtml) => {
//         var template = document.createElement('template');
//         stringHtml = stringHtml.trim(); // Never return a text node of whitespace as the result
//         template.innerHTML = stringHtml;
//         return template.content.firstChild;
//     };

//     static htmlToElements = (stringHtml) =>{
//         var template = document.createElement('template');
//         template.innerHTML = stringHtml;
//         return template.content.childNodes;
//     }

//     static appendNodeList =(parent, nodeList) => {
//         for (var i = 0; i < nodeList.length; i++) {
//             parent.appendChild(nodeList[i])
//         }
//     }

//     static sortArrayByProperty = (arr, property) => {
//         return arr.sort((a, b) => {
//             return b[property] - a[property];
//         });
//     }

//     static sortPlayers = (players) => {
//         return players.sort((player, prevPlayer) => {
//             return prevPlayer.score - player.score;
//         });
//     }

// }

// export {Utils};

const Utils = {
  htmlToElement: (stringHtml) => {
    var template = document.createElement('template');
    stringHtml = stringHtml.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = stringHtml;
    return template.content.firstChild;
  },
  htmlToElements: (stringHtml) => {
    var template = document.createElement('template');
    template.innerHTML = stringHtml;
    return template.content.childNodes;
  },
  appendNodeList: (parent, nodeList) => {
    for (var i = 0; i < nodeList.length; i++) {
      parent.appendChild(nodeList[i]);
    }
  },
  sortArrayByProperty: (arr, property) => {
    return arr.sort((a, b) => {
      return b[property] - a[property];
    });
  },
  sortPlayers: (players) => {
    return players.sort((player, prevPlayer) => {
      return prevPlayer.score - player.score;
    });
  }
};

export { Utils };
