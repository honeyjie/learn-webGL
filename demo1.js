const main = () => {
  const canvas = document.getElementById('webgl')
  const gl = getWebGLContext(canvas)

  if (!gl) {
    console.log('Failed to get the rendering context for WebGL')
    return
  }

  // 顶点着色器
  const VSHADER_SOURCE = `
  void main() { 
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 20.0;
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

  gl.clearColor(0.0, 0.0, 1.0, 1.0) // 清空绘图区之前, 要指定背景色
  gl.clear(gl.COLOR_BUFFER_BIT) // 清空绘图区颜色, 指定的背景色开始生效

  gl.drawArrays(gl.POINTS, 0, 3)
}
main()

/**
 * 知识点
 * 着色器: 
 *  顶点着色器: 描述顶点(端点、交点)的特性(位置、颜色)
 *  片元着色器: 片元(图像的单元, 像素), 进行逐片元处理的过程如光照
 * 着色器采用 GLSL ES 语言编写
 * ES 语言的类型:
 *  float 浮点数
 *  vec4(v0,v1,v2,v3) 四个浮点数组成的矢量, 前三个对应x、y、z坐标,
 *  加上第四个分量组成齐次坐标(四维), v3=1.0 时, 齐次坐标等价于顶点坐标
 * gl.drawArrays(mode, first, count)
 *  mode: 绘制方式, 如gl.POINTS, gl.LINES, gl.LINE_STRIP, gl.LINE_LOOP, gl.TRIANGLES, gl.TRIANGLE_STRIP, gl.TRIANGLE_FAN
 *  first: 表示从哪个点开始绘制
 *  count: 指定绘制需要多少顶点
 */

 /**
  * 遇到问题
  * 编译报错, 需要注意每行结束要有分号;
  * 改变z 坐标, 当前没看到变化
  */