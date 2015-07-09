package controllers

import play.api._
import play.api.mvc._

class Application extends Controller {

  def index = Action {
    // If logged in -> Select an Event
    // If logged out -> Send to login
    Ok(views.html.index())
  }


  def login = Action {
    Ok(views.html.index())
  }

  def event = Action {
    Ok(views.html.index())
  }

  def data(id: Long) = Action {
    Ok(views.html.index())
  }

  def styleGuide = Action {
    Ok(views.html.index())
  }

}
