<div class="shade">
	<div class="shade-box">
		<div class="bottom-content">
			<% btn.forEach(function(item,index){ %>
				<div data="<%= index %>" class="btn">
					<%=  item %>
				</div>
			<% }) %>
		</div>
		<div class="bottom-cancel">
			取消
		</div>
	</div>
</div>

