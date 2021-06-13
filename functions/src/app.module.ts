import {Module} from "@nestjs/common";
import {EggController} from "./egg/egg.controller";

@Module({
  controllers: [EggController],
})

/**
* Create a point.
* @param {number} x - The x value.
* @param {number} y - The y value.
*/
export class AppModule {}
