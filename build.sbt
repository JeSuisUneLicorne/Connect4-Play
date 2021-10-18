name := """Connect4"""
organization := "HTWG"

version := "1.0-SNAPSHOT"

//scalaVersion := "2.13.6"
scalaVersion := "2.12.7"

lazy val branch = "master"

lazy val game = RootProject(uri("git://github.com/danielozcpp/HTWG_SE_ConnectFour.git#%s".format(branch)))

lazy val root = Project("Connect4", file("."))
  .enablePlugins(PlayScala)
  .aggregate(game)
  .dependsOn(game)

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "5.1.0" % Test

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "HTWG.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "HTWG.binders._"
