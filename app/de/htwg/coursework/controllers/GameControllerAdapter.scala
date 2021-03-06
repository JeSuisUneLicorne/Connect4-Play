
/*
  MIT License

  Copyright (c) 2021 Daniel (he wants his privacy), Julian Zimmermann

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
 */

package de.htwg.coursework.controllers

// Source dependency related imports (Connect 4 game written in Scala)
import com.google.inject.Injector
import com.google.inject.Guice
import de.htwg.se.connect_four._
import de.htwg.se.connect_four.controller.controllerComponent.ControllerInterface

// Other imports
import play.api.libs.json._

/** Provides the encodings (semantics) of the game board.
  */
object GameBoardDiscCodes extends Enumeration {
  type GameBoardDiscCodes = Value
  val EMPTY = Value(0)
  val PLAYER1 = Value(1)
  val PLAYER2 = Value(2)
}

/** Provides an adapted interface to the source dependency's controller
  * interface. This class should suffice for accessing/updating the game board.
  */
class GameControllerAdapter {
  private val injector: Injector = Guice.createInjector(new ConnectFourModule)
  private val controller: ControllerInterface = injector.getInstance(classOf[ControllerInterface])

  /** Deletes all discs inside the board. */
  def emptyBoard(): Unit = controller.createEmptyGrid(
    "Grid Small"
  ) // Grid Small (6, 7), Middle (10, 11), Large (16, 17) possible

  /** Returns a string representation of the game board. */
  def boardToString(): String = controller.gridToString

  /** Returns a JSON representation of the game board. */
  def boardToJson(): JsValue = {
    val emptyRows: Vector[Vector[Int]] =
      Vector.fill(tellNumberOfBoardRows(), tellNumberOfBoardColumns())(
        GameBoardDiscCodes.EMPTY.id
      );

    def updateRowAt(
        rowIndex: Int,
        previousRows: Vector[Vector[Int]]
    ): Vector[Vector[Int]] = {
      val columnRange: Vector[Int] = Vector.range(0, tellNumberOfBoardColumns())
      previousRows.updated(
        rowIndex,
        columnRange.map(col => getDiscValueAt(rowIndex, col))
      )
    }

    lazy val updatedRows: Vector[Vector[Int]] = updateRowAt(
      5,
      updateRowAt(
        4,
        updateRowAt(
          3,
          updateRowAt(2, updateRowAt(1, updateRowAt(0, emptyRows)))
        )
      )
    )

    val result
        : scala.collection.immutable.HashMap[String, Vector[Vector[Int]]] =
      scala.collection.immutable.HashMap[String, Vector[Vector[Int]]](
        "row" -> updatedRows
      )

    Json.toJson(result)
  }

  /** Drops a disc in the specified column. */
  def dropDiscAt(columnIndex: Int): Unit = controller.setValueToBottom(columnIndex)

  /** Returns a disc element as an integer value at the specified board position
    * (0 - empty, 1 - player 1 or 2 - player 2).
    */
  def getDiscValueAt(rowIndex: Int, columnIndex: Int): Int = controller.grid.cells.rows(rowIndex)(columnIndex).value

  /** Checks whether or not a disc element is present at the specified board
    * position.
    */
  def isDiscSetAt(rowIndex: Int, columnIndex: Int): Boolean = controller.grid.cells.rows(rowIndex)(columnIndex).isSet

  /** Checks whether or not a win case is present. */
  def tellBoardStatus(): Enumeration#Value = controller.getGameStatus()

  /** Returns the player who is currently in turn. */
  def tellCurrentTurn(): Int = controller.currentPlayer()

  /** Checks whether the specified player is in turn or not. */
  def checkCurrentTurnOf(playerIndex: Int): Boolean = controller.getTurn(playerIndex)

  /** Returns the number of rows of the game board. */
  def tellNumberOfBoardRows(): Int = controller.grid.cells.row

  /** Returns the number of columns of the game board. */
  def tellNumberOfBoardColumns(): Int = controller.grid.cells.col

}
