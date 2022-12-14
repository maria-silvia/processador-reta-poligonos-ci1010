class Line {
  constructor(x0, y0, x1, y1) {
    // line edges
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.path_obj;
    this.color = DEFAULT_COLOR;
    // mouse distance from edges and flags, used when selected
    this.dist_from_x0;
    this.dist_from_y0;
    this.dist_from_x1;
    this.dist_from_y1;
    this.cursorOnEdge0;
    this.cursorOnEdge1;
  }

  draw() {
    const path = new Path2D();
    path.moveTo(this.x0, this.y0);
    path.lineTo(this.x1, this.y1);
    this.path_obj = path;
    CTX.strokeStyle = this.color;
    CTX.stroke(path);
  }

  mouseMatch(evt) {
    if (this.path_obj) {
      return CTX.isPointInStroke(this.path_obj, evt.offsetX, evt.offsetY);
    }
    return null;
  }

  setCursorOffset(event) {
    const { offsetX: mouse_x, offsetY: mouse_y } = event;
    // distancia entre cursor e o INICIO da linha
    this.dist_from_x0 = mouse_x - this.x0;
    this.dist_from_y0 = mouse_y - this.y0;
    // distancia entre cursor e o FIM da linha
    this.dist_from_x1 = mouse_x - this.x1;
    this.dist_from_y1 = mouse_y - this.y1;

    // verifica se eh alguma ponta
    this.cursorOnEdge0 =
      Math.abs(this.dist_from_x0) < EDGE_RADIUS &&
      Math.abs(this.dist_from_y0) < EDGE_RADIUS;
    this.cursorOnEdge1 =
      Math.abs(this.dist_from_x1) < EDGE_RADIUS &&
      Math.abs(this.dist_from_y1) < EDGE_RADIUS;
  }

  updateCoordenates(event) {
    const { offsetX: mouse_x, offsetY: mouse_y } = event;
    if (!this.cursorOnEdge0) {
      this.x1 = mouse_x - this.dist_from_x1;
      this.y1 = mouse_y - this.dist_from_y1;
    }
    if (!this.cursorOnEdge1) {
      this.x0 = mouse_x - this.dist_from_x0;
      this.y0 = mouse_y - this.dist_from_y0;
    }
  }

  paint(color) {
    this.color = color; // set to future redrawings
    if (this.path_obj) {
      CTX.strokeStyle = this.color; // color now
      CTX.stroke(this.path_obj);
    }
  }
}
