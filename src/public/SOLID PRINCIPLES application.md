**Responsabilidad única y segregación de interfaces :**

Una de las aplicaciones de este principio en mi proyecto se puede ver claramente en el ***`obstacle.service.js`*** el cuál en un principio contaba con este método **`getRouteObstacle`** el cuál le daba una responsabilidad extra a la clase **ObstacleService**

getRouteObstacles = async (*route\_id*)=>{![](Aspose.Words.67d7abdc-e5c8-4f16-8721-e8686cdea46c.001.png)

const getObstacles = await Obstacle.findAll({

where:{

route\_id:*route\_id*

}

});

const obstaclesPositions = []

getObstacles.forEach(*obstacle* =>
obstaclesPositions.push(*obstacle*.dataValues.position));

return obstaclesPositions;

}

}

Para aplicar el principio cree una nueva clase llamada ***“RouteObstacleDetector”,*** la cual, posee este método para obtener los obstáculos de la ruta.

import Obstacle from "../models/obstacle.model";![](Aspose.Words.67d7abdc-e5c8-4f16-8721-e8686cdea46c.002.png)

export default class RouteObstaclesDetector{

constructor( ){

**this**.route\_id = *route\_id*;

}

getRouteObstacles = async (*route\_id*)=>{

const getObstacles = await Obstacle.findAll({

where:{

route\_id:**this**.route\_id

}

});

const obstaclesPositions = []

getObstacles.forEach(*obstacle* =>
obstaclesPositions.push(*obstacle*.dataValues.position));

return obstaclesPositions;

}

}

**Abierto/Cerrado e Inversión de dependencias:**

Una aplicación de Open/Closed e inversión de dependencias que destaco en mi proyecto es en la clase `**UserPreferencesService**`:

export class UserPreferencesService {![](Aspose.Words.67d7abdc-e5c8-4f16-8721-e8686cdea46c.003.png)

constructor(*routeService*, *routeObstacleDetector*, *routeWaypointDetector*) {

**this**.routeService = *routeService*; **this**.routeObstacleDetector = *routeObstacleDetector*; **this**.routeWaypointDetector = *routeWaypointDetector*;

}

async getUserPreferences(*route\_id*){

const route = await **this**.routeService.getRoute(*route\_id*); if(!route){

throw new Error('Route not found');

}

const routeObstacles = await **this**.routeObstacleDetector.getRouteObstacles(*route\_id*);

const routeWaypoints = await **this**.routeWaypointDetector.getRouteWaypoints(*route\_id*);

return {

startPoint:route.dataValues.start, endPoint:route.dataValues.end, obstacles:routeObstacles,

waypoints:routeWaypoints

};

}

}

Como se puede apreciar, esta clase no viola el principio Open/Closed ni el Dependency Inversion, debido a que aplica una inyección de dependencias que le ayuda a no estar acoplada directamente de implementaciones específicas del **`RouteService`, `RouteObstacleDetector`** o **`RouteObstacleDetector`,** ya que se pasan como dependencias a través del constructor, facilitando la extensión del comportamiento sin modificar la clase si en un futuro necesite de cambiar la forma en la que se obtienen las preferencias del usuario, y quitando rigidez al código y añadiendo más facilidad en el testeo.

**Sustitución de Liskov:![](Aspose.Words.67d7abdc-e5c8-4f16-8721-e8686cdea46c.004.jpeg)**

Para trabajar sustitución de Liskov, tengo estas clases abstractas que simulan interfaces para los servicios que implementan la lógica del CRUD de las entidades de la aplicación:

Al algunas entidades tener las 4 operaciones básicas y otras tener solamente 3, como lo es en el caso de las entidades de Ruta y Ruta Óptima, decidí hacer una abstracción de estos 2 tipos de servicios, para no violar la sustitución de Liskov.

![](Aspose.Words.67d7abdc-e5c8-4f16-8721-e8686cdea46c.005.jpeg)

**Segregación de interfaces:**

De manera similar al primer ejemplo, anteriormente en mi código mi **`RouteService`** utilizaba el **WaypointService** para detectar los waypoints de las rutas:

getRouteWaypoints = async (route\_id)=>{

const getWaypoints = await Waypoint.findAll({

where:{

route\_id:route\_id

}

});

const waypoints = []

getWaypoints.forEach(waypoint => waypoints.push({

name:waypoint.dataValues.name,

position:waypoint.dataValues.position,

cost:waypoint.dataValues.cost,

}

));

return waypoints;

}

Si este Servicio crecía en funcionalidad, posiblemente el **RouteService** se hubiera visto obligado a utilizar métodos que no necesita.

Para ello, opté por segregar esta lógica en una clase que pueda detectar Waypoints de la ruta.

import Waypoint from "../models/waypoint.model.js"; ![](Aspose.Words.67d7abdc-e5c8-4f16-8721-e8686cdea46c.006.png)export default class RouteWaypointsDetector{

constructor(){}

getRouteWaypoints = async (*route\_id*)=>{

const getWaypoints = await Waypoint.findAll({

where:{

route\_id:*route\_id*

}

});

const waypoints = []

getWaypoints.forEach(*waypoint* => waypoints.push({

name:*waypoint*.dataValues.name, position:*waypoint*.dataValues.position, cost:*waypoint*.dataValues.cost,

}

));

return waypoints;

}

}
