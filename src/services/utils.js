
class Utils {
  /**
   * Sort any array of objects by property
   * @param {*} array
   * @param {*} property
   */
  static sortArrayByProperty (array, property) {
    return array.sort((a, b) => {
      return b[property] - a[property];
    });
  }

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

  /**
   * This method takes the data gotten from Data base and adds an unique ID
   * @param {*} snapshot
   */
  static handleData (snapshot) {
    // If it's a single document
    if (snapshot.exists) {
      const document = snapshot.data();
      document.id = snapshot.id;
      return document;
    }
    //  If it's a collection
    else {
      const collection = [];
      snapshot.forEach(function (doc) {
        const document = doc.data();
        document.id = doc.id;
        collection.push(document);
      });
      return collection;
    }
  };

  static getPlayersDataByProperty (room, property) {
    const players = room.players;
    const output = [];
    players.forEach((element) => {
      output.push(element[property]);
    });
    return output;
  };

  static buildPlayerObjectFromRoom (room, username) {
    const playerData = room.players.filter(player => {
      return player.username === username;
    });
    const player = {
      url: playerData[0].pictureUrl,
      color: playerData[0].color,
      username: playerData[0].username
    };
    return player;
  }
}

export { Utils };
