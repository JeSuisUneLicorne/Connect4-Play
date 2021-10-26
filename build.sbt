// Set this project's metadata
name := "connect4-play"
version := "0.1"
scalaVersion := "2.12.7"
organization := "de.htwg.coursework"
organizationName := "Konstanz University of Applied Sciences"
homepage := Some(url("https://github.com/JeSuisUneLicorne/Web-Apps-WS2021-Connect4"))
startYear := Some(2021)
description := "Coursework for our Web Applications class of fall 2021"
licenses += "MIT" -> url("https://opensource.org/licenses/MIT")

// Scalafmt
val sclafmtOnCompile = true

// Compiler options
scalacOptions ++= Seq(
  "-encoding", "UTF-8",
  "-Xfatal-warnings",
  "-deprecation",
  "-language:implicitConversions",
  "-language:higherKinds",
  "-language:existentials",
  "-language:postfixOps",
  "-feature",
  "-unchecked"
)

// Add the Connect 4 game written in Scala as a source dependency from GitHub
lazy val repoBranch: String = "master"
lazy val repoUri = uri("git://github.com/JeSuisUneLicorne/HTWG_SE_ConnectFour.git#%s".format(repoBranch))
lazy val sourceDependency: RootProject = RootProject(repoUri)

lazy val projectId: String = "connect-4-play"
lazy val project: Project = Project(projectId, file("."))
  .enablePlugins(PlayScala)
  .aggregate(sourceDependency)
  .dependsOn(sourceDependency)

// Add other dependencies
libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "5.1.0" % Test

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "de.htwg.wa.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "de.htwg.wa.binders._"
