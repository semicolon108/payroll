<template>
<div class="loaders-eiei">
	<div class="loader-eiei">
		<div class="skeleton-group-eiei">
			<div class="skeleton-eiei block"></div>
		</div>
	</div>
</div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" >
.skeleton-eiei {
	background: linear-gradient(90deg, #ededed, #ffffff, #ededed);
	animation-name: load-eiei;
	animation-duration: 1.5s;
	animation-iteration-count: infinite;
	animation-direction: forwards;
	animation-timing-function: linear;
    background-size: 200% 100%;

	&.block {
		width: 100%;
		height: 100%;
	}
}



.loader-eiei{
    height: 100%;
    width: 100%;
	display: flex;
	flex-direction: row;
	background-color: #ffffff;

	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

	> * + * {
		margin-left: 1rem;
	}
}

.skeleton-group-eiei {
	display: flex;
	flex-direction: column;
    width: 100%;
    height: 100%;
	> * + * {
		margin-top: 1rem;
	}
}

@keyframes load-eiei {
	from {
		background-position: 100% 0%;
	}
	to {
		background-position: -100% 0%;
	}
}

</style>