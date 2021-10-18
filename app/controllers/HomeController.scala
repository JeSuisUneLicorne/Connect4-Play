package controllers

// Play imports
import com.google.inject.Injector
import javax.inject._
import play.api._
import play.api.mvc._

// SE project related imports
import com.google.inject.Guice
import de.htwg.se.connect_four._
import de.htwg.se.connect_four.controller.controllerComponent.ControllerInterface

@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  val injector: Injector = Guice.createInjector(new ConnectFourModule)
  val controller: ControllerInterface = injector.getInstance(classOf[ControllerInterface])

  def restartGame(): Action[AnyContent] = Action {
    //Grid Small (6,7), Middle (10,11), Large (16,17) possible
    controller.createEmptyGrid("Grid Small")
    Ok(views.html.index(controller))
  }

  def dropDiscAt(columnIndex: Int): Action[AnyContent] = Action {
    controller.setValueToBottom(columnIndex)
    Ok(views.html.index(controller))
  }
  
}