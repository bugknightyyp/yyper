#svg path

`<path>` element的绘画是通过指定`d`attribute来实现的，`d`包含了所要绘画的指令

命令字符如果是大写，则表示使用的是绝对坐标（相对坐标系的原点），小写表示使用的是相对坐标（相对当前点的坐标）。


<style>
  table td, table th{
    padding: 5px 10px;
  }
</style>
<table>
  <tr>
    <th>command</th>
    <th>Parameters</th>
    <th>Name</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>L</td>
    <td>x,y</td>
    <td>lineto</td>
    <td>Draws a line from current pen location to specified point x,y </td>
  </tr>
  <tr>
    <td>H</td>
    <td>x</td>
    <td>horizontal lineto</td>
    <td>Draws a horizontal line to the point defined by (specified x, pens current y).</td>
  </tr>
  <tr>
    <td>V</td>
    <td>y</td>
    <td>vertical lineto</td>
    <td>Draws a vertical line to the point defined by (pens current x, specified y).</td>
  </tr>
  <tr>
    <td>C</td>
    <td>x1,y1 x2,y2 x,y</td>
    <td>curveto</td>
    <td>Draws a cubic Bezier curve from current pen point to x,y. x1,y1 and x2,y2 are start and end control points of the curve, controlling how it bends.</td>
  </tr>
  <tr>
    <td>S</td>
    <td>x2,y2 x,y</td>
    <td>shorthand / smooth curveto</td>
    <td>Draws a cubic Bezier curve from current pen point to x,y. x2,y2 is the end control point. The start control point is is assumed to be the same as the end control point of the previous curve.</td>
  </tr>
  <tr>
    <td>Q</td>
    <td>x1,y1 x,y</td>
    <td>quadratic Bezier curveto</td>
    <td>Draws a quadratic Bezier curve from current pen point to x,y. x1,y1 is the control point controlling how the curve bends.</td>
  </tr>
  <tr>
    <td>T</td>
    <td>x,y</td>
    <td>shorthand / smooth quadratic Bezier curveto</td>
    <td>Draws a quadratic Bezier curve from current pen point to x,y. The control point is assumed to be the same as the last control point used.</td>
  </tr>
  <tr>
    <td>A</td>
    <td>rx,ry 
x-axis-rotation 
large-arc-flag,
sweepflag 
x,y</td>
    <td>elliptical arc</td>
    <td>Draws an elliptical arc from the current point to the point x,y. rx and ry are the elliptical radius in x and y direction.
The x-rotation determines how much the arc is to be rotated around the x-axis. It only seems to have an effect when rx and ry have different values.
The large-arc-flag doesn't seem to be used (can be either 0 or 1). Neither value (0 or 1) changes the arc. 
The sweep-flag determines the direction to draw the arc in.</td>
  </tr>
  <tr>
    <td>Z</td>
    <td></td>
    <td>closepath</td>
    <td>Closes the path by drawing a line from current point to first point.</td>
  </tr>
  
</table>