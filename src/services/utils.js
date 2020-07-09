
class Utils {
  static htmlToElement (stringHtml) {
    var template = document.createElement('template');
    stringHtml = stringHtml.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = stringHtml;
    return template.content.firstChild;
  };

  static htmlToElements (stringHtml) {
    var template = document.createElement('template');
    template.innerHTML = stringHtml;
    return template.content.childNodes;
  }

  static appendNodeList (parent, nodeList) {
    for (var i = 0; i < nodeList.length; i++) {
      parent.appendChild(nodeList[i]);
    }
  }

  static sortArrayByProperty (arr, property) {
    return arr.sort((a, b) => {
      return b[property] - a[property];
    });
  }

  static sortPlayers (players) {
    return players.sort((player, prevPlayer) => {
      return prevPlayer.score - player.score;
    });
  };

  /*
  * Extracts one or multiple parameters from the URL search query.
  * Usages:
  *   Utils.getURLParams('example')
  *   Utils.getURLParams(['example1', 'example2'])
  */
  static getURLParams (requestedParams) {
    const urlParams = new URLSearchParams(window.location.search);
    const isArray = Array.isArray(requestedParams);

    if (!isArray) {
      requestedParams = [requestedParams];
    }
    const outputParams = requestedParams.map(param => {
      return urlParams.get(param);
    });

    if (isArray) {
      return outputParams;
    }
    else {
      return outputParams[0];
    }
  }
}

export { Utils };
