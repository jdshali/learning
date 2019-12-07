### 一、BFC（Block Formatting Contexts）块级格式化上下文

- 页面上的一个隔离的渲染区域
- 如何产生？
- 看触发BFC的元素有float、position、overflow、display:table-cell/inline-block/table-caption
- 有啥用？比如常见的多栏布局、结合块级元素浮动、里面的元素则是一个相对隔离的环境里运行


### 二、IFC（inline formatting contexts）内联格式化上下文

- 如何产生？ 
- 块级元素中仅包含内联级别元素

  #### 1、IFC布局规则
    - 子元素水平方向横向排列、并且垂直方向起点为元素顶部
    - 子元素只会计算横向样式空间，【padding、border、margin】，垂直方向样式空间不会被计算，【padding、border、margin】。
    - 在垂直方向上，子元素会以不同形式来对齐（vertical-align）
    - 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框的宽度是由包含块（containing box）和与其中的浮动来决定。
    - IFC中的“line box”一般左右边贴紧其包含块，但float元素会优先排列。
    - IFC中的“line box”高度由 CSS 行高计算规则来确定，同个IFC下的多个line box高度可能会不同。
    - 当 inline-level boxes的总宽度少于包含它们的line box时，其水平渲染规则由 text-align 属性值来决定。
    - 当一个“inline box”超过父元素的宽度时，它会被分割成多个boxes，这些 oxes 分布在多个“line box”中。如果子元素未设置强制换行的情况下，“inline box”将不可被分割，将会溢出父元素。

  #### 2、去理解下
   - 很多时候，上下间距不生效可以使用IFC来解释
   ```
   .warp { border: 1px solid red; display: inline-block; }
   .text { margin: 20px; background: green; }

    <div class="warp">
        <span class="text">文本一</span>
        <span class="text">文本二</span>
    </div>
   ```
   *结论：左右margin撑开，上下margin并未撑开，符合IFC规范，只计算横向样式控件，不计算纵向样式空间。*

   - 多个元素水平居中

   ```
    .warp { border: 1px solid red; width: 200px; text-align: center; }
    .text { background: green; }

    <div class="warp">
        <span class="text">文本一</span>
        <span class="text">文本二</span>
    </div>
   ```

   - float元素优先排列
   ```
    .warp { border: 1px solid red; width: 200px; }
    .text { background: green; }
    .f-l { float: left; }

    <div class="warp">
        <span class="text">这是文本1</span>
        <span class="text">这是文本2</span>
        <span class="text f-l">这是文本3</span>
        <span class="text">这是文本4</span>
    </div>
   ```
   *IFC中具备float属性值的元素优先排列，在很多场景中用来在文章段落开头添加“tag”可以用到。*

   #### 3、利用IFC还可以做很多其他的事情，例如：解决元素垂直居中、多个文本元素行高不一致排列混乱。
 