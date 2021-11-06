name := "Connect 4 Play"

version := "0.1"

scalaVersion := "2.13.6"

scalacOptions ++= Seq(
  "-encoding", "utf8",
  "-Xfatal-warnings",
  "-deprecation",
  "-unchecked",
  "-language:implicitConversions",
  "-language:higherKinds",
  "-language:existentials",
  "-language:postfixOps"
)

libraryDependencies ++=Seq(
  guice,
  "org.scalatestplus.play" %% "scalatestplus-play" % "5.1.0" % Test
)

lazy val sourceDependency: RootProject = RootProject(uri("https://github.com/JeSuisUneLicorne/HTWG_SE_ConnectFour#master"))

lazy val project: Project = Project("connect4-play", file(".")).enablePlugins(PlayScala).aggregate(sourceDependency).dependsOn(sourceDependency)

dependencyOverrides += "org.scala-lang.modules" %% "scala-xml" % "1.2.0"
