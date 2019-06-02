const main = () => {
  const canvas = document.getElementById('webgl')
  const gl = getWebGLContext(canvas)

  if (!gl) {
    console.log('Failed to get the rendering context for WebGL')
    return
  }

  // 顶点着色器
  const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    void main() {
      gl_Position = a_Position;
      gl_PointSize = a_PointSize;
    }
  `
  
  const FSHADER_SOURCE = `
    void main() { 
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `
  
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to initialize shaders')
    return
  }


  const a_Position = gl.getAttribLocation(gl.program, 'a_Position') // 获取attribute 变量的存储位置保存在 js 中
  const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize') 
  console.log(a_PointSize)
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position')
    return
  }
  
  // 将顶点位置传递给 attribute 变量
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)
  gl.vertexAttrib1f(a_PointSize, 30.0)
  gl.clearColor(0.0, 0.0, 1.0, 1.0) // 清空绘图区之前, 要指定背景色
  gl.clear(gl.COLOR_BUFFER_BIT) // 清空绘图区颜色, 指定的背景色开始生效

  gl.drawArrays(gl.POINTS, 0, 3)
}
main()

/**
 * 知识点
 * 将位置信息从Javascript传递到着色器两种方式
 * attribute: 传递与顶点相关的数据, 存储限定符, attribute vec4 a_Position 申明后面的变量是attribute变量
 * uniform: 传递对所有顶点或片元都一致的数据,
 * 
 * gl.program 程序对象
 * gl.vertexAttrib3f: 
 *   由基础函数名 + 参数个数 + 参数类型组成
 *   传输3个值, 一共需要4个值，剩下的值会自动补填 === gl.vertexAttrib3fv(a_Position, [0.0, 0.0, 0.0])
 * 
 * 
 */

 /**
  * 遇到问题
  */