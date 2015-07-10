package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.functional.syntax._

class Auth extends Controller {

  case class LoginForm(email: String, pass: String)

  implicit val loginFormWrites: Reads[LoginForm] = (
    (JsPath \ "email").read[String] and
    (JsPath \ "pass").read[String]
  )(LoginForm.apply _)

  def check(email: String, password: String) = {
    (email == "gerald@athlinks.com" && password == "asdf")
  }

  def authenticate = Action(BodyParsers.parse.json) { request =>
    val form = request.body.validate[LoginForm]

    form.fold(
      errors => {
        BadRequest(Json.obj("status" -> "KO", "errors" -> JsError.toJson(errors)))
      },
      login => {
        if( check( login.email, login.pass ) ) {
          Ok(Json.obj("status" -> "OK")).withSession("email" -> login.email)
        } else {
          BadRequest(Json.obj("status" -> "KO", "errors" -> "Invalid Credentials"))
        }
      }
    )
  }

  def logout = Action {
    Ok(Json.obj("status" -> "OK")).withNewSession.flashing(
      "success" -> "You are now logged out."
    )
  }
}
